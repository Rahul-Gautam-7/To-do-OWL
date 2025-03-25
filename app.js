const {Component,mount,xml,useState} = owl   

class Root extends Component{
    static template = xml `
     <div class="container my-5">
        <div class="text-center">
            <h1>To Do list Using OWL JS</h1>
            <div class="input-group m-5">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" t-model="state.name" />
                <input type="color" class="form-control-lg"  aria-describedby="button-addon2" title="Choose Your Color" t-model="state.color" />
                <button class="btn btn-warning" type="button" id="button-addon2" t-on-click='addTask'>Add-To-List</button>
            </div>

            <ul class="'d-flex' flex-column mt-5 p-0">
                <t t-foreach="tasks" t-as="task" t-key="task.id">  
                    <li t-attf-style="background-color:#{task.color}" class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
                    <input class="form-check-input" type="checkbox" value="" t-att-id="task.id"/>
                    <label class="form-label" t-att-for="task.id">
                        <t t-esc="task.name"/>
                    </label>
                    <button class="btn btn-danger">Delete</button>
                    <button class="btn btn-primary">Edit</button>    
                    </li>
                </t>       
            </ul>
        </div>
    </div>
    `
    

    setup(){
        this.state=useState({
            name:"",
            color:"black",
            isCompleted:false,
        })
        this.tasks=useState([])   
    }
    addTask(){
        console.log(this.state)
        this.tasks.push({
            id:1,
            name:this.state.name,
            color:this.state.color,
            isCompleted:false,
        })
    }
}

mount(Root,document.getElementById("root"))