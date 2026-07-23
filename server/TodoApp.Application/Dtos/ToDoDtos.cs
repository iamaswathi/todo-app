namespace TodoApp.Application.Dtos;

public record ToDoDto(Guid id, string Title, bool IsCompleted, DateTime CreatedOn);
public record CreateToDoRequest(string Title);