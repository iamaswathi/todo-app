using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Dtos;
using TodoApp.Application.Interfaces;

namespace TodoApp.Api.Controllers;


[ApiController]
[Route("api/[controller]")]

public class ToDoController: ControllerBase
{
    private readonly IToDoService _toDoService;

    public ToDoController(IToDoService toDoService)
    {
        _toDoService = toDoService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<ToDoDto>> GetAll() => 
        Ok(_toDoService.GetAll());

    [HttpPost]
    public ActionResult<ToDoDto> Create([FromBody] CreateToDoRequest request)
    {
        if(string.IsNullOrWhiteSpace(request.Title))
        return BadRequest("Title is required.");

        var created = _toDoService.Create(request);
        return CreatedAtAction(nameof(GetAll), new {id = created.id}, created);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id) =>
        _toDoService.Delete(id) ? NoContent() : NotFound();
}