import React, { Component } from 'react';

export class Lanche {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.ingrediente = [];
        this.valor = 0;
    }
}

export class AddLanche extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", lanche: new Lanche(), loading: true , ingrediente : []};
        this.intialize();
       
        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.ingredientesData();
    }

    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Lanche/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", lanche: data, loading: false });
        }
        else {

            this.state = { title: "Create", lanche: new Lanche(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();        

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Lanche</h3>
                {contents}
            </div>
        );
    }


    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.lanche.id > 0) {
            const response1 = fetch('api/Lanche/' + this.state.lanche.id, { method: 'PUT', body: data });
            this.props.history.push('/fetch-lanche');            
        }
        else {
            const response2 = fetch('api/Lanche', { method: 'POST', body: data });
            this.props.history.push('/fetch-lanche');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-lanche');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.lanche.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nome" placeholder="Nome" defaultValue={this.state.lanche.nome} required />
                    </div>                    
                </div>
                <div className="form-group row">                  
                     
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.lanche.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>

        );
    }
  
    async ingredientesData() {
        const response = await fetch('api/Ingrediente');
        const data = await response.json();
        this.setState({ ingredientes: data});
    }

  
}


