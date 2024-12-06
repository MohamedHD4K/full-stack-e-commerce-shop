import { Button, Container } from "react-bootstrap";
import Input from "../Input";
import { useCallback, useState } from "react";

const ContactPage = () => {
  const [value, setValue] = useState();

  const handelChange = useCallback(({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  } , [value]) ;

  return (
    <Container>
      <div
        className="d-flex align-items-center justify-content-center gap-5"
        style={{ height: "80vh" }}
      >
        <div className="d-flex flex-column gap-3 text-dark bg-light border rounded p-4">
          <div
            className="d-flex align-items-center gap-2"
          >
            <span className="material-symbols-outlined fs-1 fw-bold">mail</span>
            <span className="fs-1 fw-bold">Contact Us</span>
          </div>
          
          <Input
            label="Email"
            id="email"
            handelChange={handelChange}
            value={value}
            title="Email"
            className="rounded-pill border-dark"
            style={{ width: "400px" }}
          />

          <Input
            label="Message"
            id="message"
            handelChange={handelChange}
            value={value}
            title="Message"
            className="rounded-pill border-dark"
            style={{ width: "400px" }}
          />

          <Button className="mt-3">Send</Button>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
