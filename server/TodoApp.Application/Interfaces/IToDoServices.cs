using TodoApp.Application.Dtos;

namespace TodoApp.Application.Interfaces;

public interface IToDoService
{
    IEnumerable<ToDoDto> GetAll();
    ToDoDto Create(CreateToDoRequest request);
    bool Delete(Guid id);
}