using TodoApp.Application.Dtos;
using TodoApp.Application.Interfaces;
using TodoApp.Domain;

namespace TodoApp.Application.Services;

public class ToDoService: IToDoService
{
    private readonly IToDoRepository _repository;

    public ToDoService(IToDoRepository repository)
    {
        _repository = repository;
    }

    public  IEnumerable<ToDoDto> GetAll()=>
        _repository.GetAll()
        .OrderBy(t => t.CreatedOn)
        .Select(ToDto);
    public ToDoDto Create(CreateToDoRequest request)
    {
        if(string.IsNullOrWhiteSpace(request.Title))
        throw new ArgumentException("Title cannot be empty.", nameof(request));

        var item = new ToDoItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title.Trim(),
            IsCompleted = false,
            CreatedOn = DateTime.UtcNow
        };
        return ToDto(_repository.AddItem(item));
    }
    public bool Delete(Guid id) => _repository.Delete(id);

    public static ToDoDto ToDto(ToDoItem item) => 
        new(item.Id, item.Title, item.IsCompleted, item.CreatedOn);
}