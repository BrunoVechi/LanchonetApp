import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchLanche extends Component {
    static displayName = "Lanche";

    constructor() {
        super();
        this.state = { lanches: [], loading: true }
    }

    componentDidMount() {
        this.populaLanchesData();
    }

    static handleEdit(id) {
        window.location.href = "/lanche/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o Lanche : " + id + "?")) {
            return;
        }
        else {
            fetch('api/Lanche/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-lanche";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderLanchesTabela(lanches) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>                       
                        <th>Nome</th>
                        <th>Ingredientes</th>
                        <th>Valor R$</th>
                    </tr>
                </thead>
                <tbody>
                    {lanches.map(lanc =>
                        <tr key={lanc.id}>
                            <td>{lanc.nome}</td>
                            <td>{lanc.ingredientes}</td>
                            <td>{lanc.valor}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(lanc.id)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(lanc.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : FetchLanche.renderLanchesTabela(this.state.lanches);

        return (
            <div>
                <h1 id="tabelLabel" >Lanches</h1>
                <p>Tela de Listagem de Lanches</p>
                <p>
                    <Link to="/add-lanche">Cadastrar Lanche</Link>
                </p>
                {contents}
            </div>
        );
    }


    async populaLanchesData() {
        const response = await fetch('api/Lanche');
        const data = await response.json();
        this.setState({ lanches: data, loading: false });
    }

}