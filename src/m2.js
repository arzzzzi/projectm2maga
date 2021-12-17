window.addEventListener('load', () => {
    init();
});

function init() {
    const taskList = new TaskList();
    taskList.addTask()
    const btnAdd = document.querySelector('.btn-add');
    const btnSort = document.querySelector('.btn-sort');
    const plus = document.querySelector('.plus')

    btnAdd.addEventListener('click', () => {
        plus.classList.remove('default')
        plus.classList.add('animated')
        setTimeout(() => {
            plus.classList.remove('animated')
            plus.classList.add('default')
        }, 4000)
        taskList.addTask();
    });
    btnSort.addEventListener('click', event => {
        if (event.currentTarget.classList.contains('down')) {
            taskList.sortList('down');
            event.currentTarget.classList.remove('down');
            event.currentTarget.classList.add('up');
        } else {
            taskList.sortList('up');
            event.currentTarget.classList.remove('up');
            event.currentTarget.classList.add('down')
        }
    });
}


class TaskList {
    constructor() {
        this.container = document.querySelector('.task-list-cont');
        this.taskList = [];
        this.idCount = 0;
    }
    addTask() {
        const task = new Task(
            this.idCount++,
            id => this.deleteTask(id)
        );
        this.taskList.push(task);
        this.container.append(task.container);
    }
    deleteTask(id) {
        const deletedTask = this.taskList.find(task => task.id === id);
        const index = this.taskList.indexOf(deletedTask);
        this.taskList.splice(index, 1);
        console.log(this.taskList);
        deletedTask.container.remove();
    }
    sortList(sortStatus) {
        this.taskList.sort((a, b) => {
            if (a.input.value > b.input.value) {
                return sortStatus === 'down' ? 1 : -1;
            } else if (a.input.value < b.input.value) {
                return sortStatus === 'down' ? -1 : 1;
            }
            return 0;
        })
        this.container.innerHTML = '';
        this.taskList.forEach(task => {
            this.container.append(task.container);
        })
    }
}

class Task {
    constructor(id, deleteTask) {
        this.id = id;
        this.container = document.createElement('div');
        this.container.classList.add('task');
        this.container.innerHTML = `
                    <input placeholder="Введите задачу">
                    <div class="btn-delete">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                            <path d="M6 6L14 14" stroke="#C4C4C4"/>
                            <path d="M6 14L14 6" stroke="#C4C4C4"/>
                            </svg>
                    </div>`
        const btnDelete = this.container.querySelector('.btn-delete');
        btnDelete.addEventListener('click', () => {
            deleteTask(this.id);
        });
        this.input = this.container.querySelector('input')
    }

}
