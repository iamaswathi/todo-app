namespace TodoApp.Domain;

public class ToDoItem
{
    public Guid Id {get; set;}
    public string Title {get; set;} = string.Empty;
    public bool IsCompleted {get; set;}
    public DateTime CreatedOn {get; set;}

}
