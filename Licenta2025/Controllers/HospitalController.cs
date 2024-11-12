using Licenta2025.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Licenta2025.Controllers
{
    [Route("api/")]
    public class HospitalController : ControllerBase
    {
        private readonly HospitalContext _context;
        private readonly IConfiguration _configuration;

        public HospitalController(HospitalContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [Authorize]
        public async override Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        [Authorize]
        public async override Task<ActionResult<Patient>> GetPatientId(int id)
        {
            return await _context.Patients.FirstOrDefaultAsync(x => x.Id == id);
        }

        [Authorize]
        public async override Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        public async override Task<IActionResult> PostRegister([FromBody] User body)
        {
            // Check if user with the same username or email already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == body.Username || u.Email == body.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this username or email already exists.");
            }

            // Create new user object
            var user = new User
            {
                Username = body.Username,
                Email = body.Email,
                Password = HashPassword(body.Password), // Hash the password
                CreatedDate = DateTime.UtcNow
            };

            // Save the user in the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public async override Task<ActionResult<LoginDto>> PostLoginUsernamePassword([Microsoft.AspNetCore.Mvc.FromBody] UserLoginDto body)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == body.Username);

            if (user == null)
                return Unauthorized("Invalid username");


            if (!BCrypt.Net.BCrypt.Verify(body.Password, user.Password))
                return Unauthorized("Invalid password");

            LoginDto response = new LoginDto();
            // Create JWT token
            response.Token = GenerateJwtToken(user);

            return Ok(response);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

