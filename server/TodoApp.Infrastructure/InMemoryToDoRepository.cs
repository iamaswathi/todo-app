using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using TodoApp.Application.Interfaces;
using TodoApp.Domain;

namespace TodoApp.Infrastructure;

public class InMemoryToDoRepository: IToDoRepository
{
    private readonly ConcurrentDictionary<Guid, ToDoItem> _items = new();

    public IEnumerable<ToDoItem> GetAll() => _items.Values;

    public ToDoItem? GetById(Guid id) => 
        _items.TryGetValue(id, out var item) ? item : null;

    public ToDoItem AddItem(ToDoItem item)
    {
        _items[item.Id] = item;
        return item;
    }

    public bool Delete(Guid id) => _items.TryRemove(id, out _);
}
