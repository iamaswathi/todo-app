using TodoApp.Domain;
namespace TodoApp.Application.Interfaces;

public interface IToDoRepository
{
    IEnumerable<ToDoItem> GetAll();
    ToDoItem? GetById(Guid id);
    ToDoItem AddItem(ToDoItem item);
    bool Delete(Guid id);
}