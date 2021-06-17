import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
function Popups(props) {
  const [modalOpen, setModalOpen] = React.useState(true);
  const router = useRouter();
  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            WishList
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>{props?.message}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Link className="nav-link" exact href={`/${router?.query?.page}/wishlist/wishlist`}>
          <a><Button color="primary" type="button">
            View wishlist
          </Button></a>
        </Link> 
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Popups;