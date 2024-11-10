using Licenta2025.Data;
using Microsoft.EntityFrameworkCore;

namespace Licenta2025.Controllers
{
    public class HospitalController : ControllerBase
    {
        private readonly HospitalContext _context;

        public HospitalController(HospitalContext context)
        {
            _context = context;
        }

        public async override Task<IEnumerable<Doctor>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async override Task<Patient> GetPatientId(int id)
        {
            return await _context.Patients.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async override Task<IEnumerable<Patient>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }
    }
}

