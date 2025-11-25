using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // GET: api/album
        [HttpGet]
        public IActionResult Get()
        {
            var albums = Album.GetAll();

            return Ok(albums);
        }

        // GET albums/sort/{by}
        [HttpGet("sort/{by}")]
        public IActionResult Sort(string by)
        {
            var albums = Album.GetAll();
            List<Album> sorted;
            switch (by.ToLower())
            {
                case "title":
                    sorted = albums.OrderBy(a => a.Title).ToList();
                    break;
                case "artist":
                    sorted = albums.OrderBy(a => a.Artist).ToList();
                    break;
                case "genre":
                    // Genre not present in Album, so return unsorted
                    sorted = albums;
                    break;
                default:
                    return BadRequest("Invalid sort key. Use 'title', 'artist', or 'genre'.");
            }
            return Ok(sorted);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetAll().FirstOrDefault(a => a.Id == id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

    }
}
