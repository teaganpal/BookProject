using BookProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize=6, int pageNum=1, string sortOrder="asc")
        {
            var booksQuery = _context.Books.AsQueryable();
            if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }
            var someItem = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _context.Books.Count();

            var pageObject = new
            {
                Books = someItem,
                TotalNumBooks = totalNumBooks
            };

            return Ok(pageObject);
        }
        
        [HttpGet("GetAllCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }
    }
}
