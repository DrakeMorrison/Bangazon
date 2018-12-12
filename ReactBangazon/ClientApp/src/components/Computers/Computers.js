﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import computersRequests from '../../APICalls/ComputersRequests';

const defaultComp = {
    employeeId: '',
    firstName: '',
    lastName: '',
}

class Computers extends React.Component {
    state = {
        computers: [],
        isClicked: false,
        newComp: defaultComp,
    };

    componentDidMount = (e) => {
        this.getAllComputers();
    }

    //----------------------------------------------------Api call event handlers----------------------------------------------------------------//
    getAllComputers = (e) => {
        computersRequests
            .getAllComputersRequest()
            .then((comps) => {
                this.setState({ computers: comps });
                console.log(comps);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addComputer = (e) => {
        e.preventDefault();
        const { newComp } = this.state;
        computersRequests
            .addComputer(newComp)
            .then(() => {
                JSON.stringify(this.newComp);
                this.props.history.push('/computers');
                this.setState({ isClicked: false });                
                this.getAllComputers();               
            })
            .catch((err) => {
                console.error('Error in adding a new computer', err);
            })
    }

    deleteComputer = (e) => {
        const id = e.target.dataset.id;
        computersRequests
            .deleteComputer(id)
            .then(() => {
                this.getAllComputers();
            })
            .catch((err) => {
                console.error('something went wrong in the delete computer request', err);
            })
    }

    editComputer = (e) => {
        const id = e.target.dataset.id;
        computersRequests   
            .updateComputer(id)
            .then(() => {
                this.getAllComputers();
            })
            .catch((err) => {
                console.error('error in the update computer request', err);
            })
    }


    //----------------------------------------------------------Modal handlers-----------------------------------------------------------//
    addComputerModal = (e) => {
        this.setState({ isClicked: true });
    }

    closeModal = (e) => {
        this.setState({ isClicked: false });
    }

//----------------------------------------------------- Input value handlers for the add Computer-------------------------------------------//
    addComputerEvent = (info, e) => {
        const tempComp = { ...this.state.newComp };
        tempComp[info] = e.target.value;
        this.setState({ newComp: tempComp })
    }

    employeeIdChange = (e) => {
        this.addComputerEvent('employeeId',e);
    }

    handleEditClick = (e, newComp) => {
        console.log('click function working');
        <input
                type="text"
                className="form-control"
                id="put"
                placeholder="ex. 1"
                value={newComp.employeeId}
                onChange={this.employeeIdChange}
            />
    }


    render() {
        const newComp = this.state.newComp;

        const compData = this.state.computers.map(comps => {
            return (
                <div key={comps.id} className="panel panel-default" >
                    <div className="panel-heading">                        <h3 className="panel-title">Computer Id: {comps.id}</h3>
                    </div>
                    <div className="panel-body">
                        <p>Employee: {`${comps.firstName}` + " " + `${comps.lastName}`}</p>
                        <p>Employee Id: {comps.employeeId}</p>

                        <div className="col-md-offset-3">
                            <button type="submit" className="col-sm-2 btn btn-md btn-primary" id="editComputerButt" onClick={((e) => this.handleEditClick(e))}> Edit </button>
                            <button type="submit" className="col-md-offset-3 col-sm-2 btn btn-md btn-danger" id="deleteComputerButt" onClick={this.deleteComputer} data-id={comps.id}> Delete </button>
                        </div>
                    </div>
                </div >
            );
        });
        //if (onCLick == "editComputerButt") {
        //    <p>EmployeeId: <input
        //        type="text"
        //        className="form-control"
        //        id="put"
        //        placeholder="ex. 1"
        //        value={newComp.employeeId}
        //        onChange={this.employeeIdChange}
        //    /> </p>
    //}
 
        return (
            <div className='Computers'>
                <div>
                    <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                </div>
                <div>
                    {compData}
                    <div>
                        <button type="button" className="btn btn-info" onClick={this.addComputerModal}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                    </div>

                    <Modal show={this.state.isClicked} onHide={this.closeModal}>
                        <Modal.Header>
                            <Modal.Title>Add a New Computer</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>                            
                            <form className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="exampleInputName2">Employee Id </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addEmpId"
                                        placeholder="ex. 1"
                                        value={newComp.employeeId}
                                        onChange={this.employeeIdChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>

                        <Button bsStyle="primary" onClick={this.addComputer}>Save changes</Button>

                    </Modal.Footer>
                    </Modal>


            </div>
            </div >
        );
    };
};

export default Computers;
