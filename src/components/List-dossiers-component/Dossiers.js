import {useHistory} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";
import jwt from "jwt-decode";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReclasserDossier from "./reclasser-dossier-component";
import Archive from "../Archive-component/Archive";
import DeleteDossier from "./Supprimer-dossier";
import ReactToPrint from "react-to-print";
import PrintComponent from "../print/PrintComponent";
import styled from 'styled-components';

import DataTable from "react-data-table-component";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input
            id="search"
            className="form-control-sm"
            type="text"
            placeholder="Chercher ..."
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
            style={{borderTop:"none",borderRight:"none",borderLeft:"none"}}
        />
        <button type="button" onClick={onClear}  class="btn btn-light">
            X
        </button>
    </>
);
const Dossiers = () => {
    const ids = ["1"];
    var a = [];
    const history = useHistory()
    const [x, setX] = useState(1);
    const [data, setData] = useState([]);
    const [nom, setNom] = useState([]);
    const [emplacement, setEmplacement] = useState([]);
    const [tel, setTel] = useState([]);

    const [searchTerm,setSearchTerm] = useState("")
    const [selectedData, setSelectedData] = useState();
    const [filterText, setFilterText] = useState('');
    const filteredItems = data.filter(item=>
        item.typeDs.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.lieu.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.numAffaire.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.emplacement.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.client.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.tel.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        item.mission.toString().toLowerCase().includes(filterText.toLowerCase())

    )
    const columns = [
        {
            name: "Numéro affaire",
            selector: row => row.numAffaire,
        },
        {
            name: "Lieu",
            selector: row => row.lieu,
        },
        {
            name: "Type dossier",
            selector: row => row.typeDs
        },
        {
            name: "Emplacement",
            selector: row => row.emplacement
        },
        {
            name: "Client",
            selector: row => row.client
        },
        {
            name: "Tel",
            selector: row => row.tel
        },
        {
            name: "Mission",
            selector: row => row.mission
        },
    ];


    const handleChange = (state) => {
        setSelectedData(state.selectedRows);
    };
    let componentRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt(token)
            if (!user) {

                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/dossiers/all',{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                })
                    .then(res => {
                        return res.json();
                    }).then(r =>
                {

                    setData(r)


                }).catch(err =>{
                    console.log(err);
                })
            }
        }

    },[x])

    const refresh = () => {
        setX(x+1);
    };
    const test = () => {
        console.log(selectedData);
    };
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);
    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12">

                    <div className="card" ref={el =>(componentRef=el)}>
                        <div className="card-header">
                            <h3 className="card-title">Liste des dossiers</h3>
                            <span style={{float:"right"}}>
                                <ReactToPrint
                                    trigger={() => {
                                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                        // to the root node of the returned component as it will be overwritten.
                                        return <a href="#">Imprimer la liste</a>;
                                    }}
                                    content={() => componentRef}
                                />
                           </span>
                        </div>
                        <div className="card-body">
                            <p style={{display:"flex"}}>
                                <ReclasserDossier refresh={refresh} selectedData={selectedData}/>
                                <Archive refresh={refresh} selectedData={selectedData}/>
                                <DeleteDossier refresh={refresh} selectedData={selectedData}/>
                            </p>

                            <DataTable
                                data={filteredItems}
                                columns={columns}
                                selectableRows
                                highlightOnHover
                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                onSelectedRowsChange={handleChange}
                            />

                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default Dossiers