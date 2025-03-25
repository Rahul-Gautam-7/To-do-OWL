const {Component,mount,xml,useState} = owl   

class Root extends Component{
    static template = xml `
     <div class="container my-5">
        <div class="text-center">
            <h1>To Do list Using OWL JS</h1>
            <div class="input-group m-5">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button class="btn btn-warning" type="button" id="button-addon2">Add-To-List</button>
            </div>

            <ul class="'d-flex' flex-column">
                <t t-foreach="tasks" t-as="task" t-key="task">
                    <button class="btn btn-danger">Delete</button>
                    <button class="btn btn-primary">Edit</button>    
                </t>       
            </ul>


        </div>
    </div>
    `
    

    setup(){
        this.tasks=useState([1,2,3])
    }
}

mount(Root,document.getElementById("root"))