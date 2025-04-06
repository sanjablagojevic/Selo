﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactApp1.Server.Data;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public UserManagerController(UserManager<ApplicationUser> userManager, ApplicationDbContext context, IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ApplicationUser newUser)
        {
            if (newUser == null)
                return BadRequest("User data is invalid.");

            var pass = "Test123!";  // Default password

            // Hash the password using PasswordHasher
            var passwordHasher = new PasswordHasher<ApplicationUser>();
            var hashedPassword = passwordHasher.HashPassword(newUser, pass);


            var user = new ApplicationUser
            {
                UserName = newUser.Email,
                Email = newUser.Email,
                PasswordHash = hashedPassword,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                //Villages = newUser.Villages
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send email to created user
            await SendWelcomeEmail(user.Email, pass);

            return Ok(user);
        }

        private async Task SendWelcomeEmail(string email, string password)
        {
            var emailService = new EmailService(_configuration);
            var subject = "Dobrodošli!";
            var body = $"Zdravo, \n\nDobrodošli! Tvoj korisnički račun je uspješno kreiran. Tvoji podaci za logovanje:\n\nEmail: {email}\nLozinika: {password}\n\nPozdrav,\nDigitalno Selo";

            await emailService.SendEmailAsync(email, subject, body);
        }
    }
}

