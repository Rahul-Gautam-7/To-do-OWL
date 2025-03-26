const {Component,mount,xml,useState} = owl   

class Task extends Component{
    static template = xml `
           <li t-attf-style="background-color:#{state.color}" class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
                <div t-if="state.isEditing" class="d-flex align-items-center flex-grow-1 me-2">
                    <input type="text"  class="form-control me-2" t-model="state.name" />
                    <input type="color" style="width:60px" class="form-control-lg form-control-color border-0 bg-white m-0" id="color" title="Choose Your Color" t-model="state.color" />

                </div>
           
                <div t-if="!state.isEditing" class="form-check  form-switch fs-5 ">
                    <input class="form-check-input" type="checkbox" value=""  t-att-checked="state.isCompleted"  t-att-id="state.id" t-on-click="toggleTask"/>
                    <label class="form-label" t-att-for="state.id" t-attf-class="#{state.isCompleted ? 'text-decoration-line-through': ''}" >
                        <t t-esc="state.name"/>
                    </label>
                </div>
                <div>
                    <button class="btn btn-primary"  t-if="!state.isEditing" t-on-click="editTask">Edit</button>
                    <button class="btn btn-primary"  t-if="state.isEditing" t-on-click="saveTask">Save</button>    
                    <button  class="btn btn-danger" t-on-click="deleteTask">Delete</button>
                </div>
            </li>
    `
    static props = ["task","onDelete","onEdit"]

    setup(){
        this.state=useState({
            isEditing:false,
            id:this.props.task.id,
            name:this.props.task.name,
            color:this.props.task.color,
            isCompleted:this.props.task.isCompleted,
        })
    } 

    toggleTask(){
        this.state.isCompleted = !this.state.isCompleted
    }

    deleteTask(){
        this.props.onDelete(this.props.task)
    }

    editTask(){
        this.state.isEditing=true
    }

    saveTask() {
        this.state.isEditing = false  
        this.props.onEdit(this.state)
    }
}
class Root extends Component{
    static template = xml `
     <div class="container my-5">
        <div class="text-center">
            <h1>To Do list Using OWL JS</h1>
            <div class="input-group m-5">
                <input type="text" class="form-control" placeholder="Enter you Task" aria-label="Enter you Task" aria-describedby="button-addon2" t-att-value="state.name" t-model="state.name" />
                <input type="color" class="form-control-lg"  aria-describedby="button-addon2" title="Choose Your Color" t-model="state.color" t-att-value="state.color" />
                <button class="btn btn-warning" type="button" id="button-addon2" t-on-click='addTask'>Add-To-List</button>
            </div>

             <ul class="'d-flex' flex-column mt-5 p-0">
                <t t-foreach="tasks" t-as="task" t-key="task.id">  
                    <Task task="task" onDelete.bind="deleteTask" onEdit.bind="editTask" />
                </t>       
            </ul>
         
        </div>
    </div>
    `
    static components = {Task}

    setup(){
        this.state=useState({
            name:"",
            color:"black",
            isCompleted:false,
        })
        this.tasks=useState([])   
    }
    addTask(){
        if(!this.state.name)
        {
            alert("Please Provide The Task Field")
            return
        }
        const id=Math.random().toString().substring(2,12)
    
        this.tasks.push({
            id:id,
            name:this.state.name,
            color:this.state.color,
            isCompleted:false,
        })

        let state = this.state
        this.state = {...state,name:"",color:"#FFF000"}
        console.log(this.tasks)
    }

    deleteTask(task){
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index,1)
    }

    editTask(task){
        const index = this.tasks.findIndex(t=>t.id == task.id)
        this.tasks.splice(index,1,task)
    }
}

mount(Root,document.getElementById("root"))