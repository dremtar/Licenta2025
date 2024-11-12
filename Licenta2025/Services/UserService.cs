using Licenta2025.Data;
using Microsoft.EntityFrameworkCore;

namespace Licenta2025
{
    public class UserService
    {
        private readonly HospitalContext _context;

        public UserService(HospitalContext context)
        {
            _context = context;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {
            // Find user by username
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user == null) return null;

            // Verify password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.Password);
            return isPasswordValid ? user : null;
        }
    }
}