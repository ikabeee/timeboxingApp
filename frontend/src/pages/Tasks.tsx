import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import ModalAddTask from "../components/ModalAddTask";
import { Button } from "@nextui-org/react";

export default function App() {
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <MDBCol size="12">
                  </MDBCol>
                  <MDBCol size="12">
                    <ModalAddTask />
                  </MDBCol>
                  <MDBCol size="12">
                    <Button color="warning">Get tasks</Button>
                  </MDBCol>
                </MDBRow>
                <MDBTable className="mb-4">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Buy groceries for next week</td>
                      <td><span className="badge bg-info text-dark">Medium</span></td>
                      <td>In progress</td>
                      <td className="d-flex justify-content-center"> 
                        <MDBBtn type="submit" color="danger">Delete</MDBBtn>
                        <MDBBtn type="submit" color="success" className="ms-1">Finished</MDBBtn>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Renew car insurance</td>
                      <td><span className="badge bg-warning text-dark">High</span></td>
                      <td>In progress</td>
                      <td className="d-flex justify-content-center">
                        <MDBBtn type="submit" color="danger">Delete</MDBBtn>
                        <MDBBtn type="submit" color="success" className="ms-1">Finished</MDBBtn>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Sign up for online course</td>
                      <td><span className="badge bg-success text-light">Low</span></td>
                      <td>In progress</td>
                      <td className="d-flex justify-content-center">
                        <MDBBtn type="submit" color="danger">Delete</MDBBtn>
                        <MDBBtn type="submit" color="success" className="ms-1">Finished</MDBBtn>
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
