import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import {
  AgreementCard,
  LawyerPayment,
  PaymentCard,
} from "../../AppRoute/featuresRoute/payment";
import "./Payment.css";
import cookie from "js-cookie";
import { getCategoryById } from "../../services/categoryService";
import { useParams } from "react-router-dom";
import { getLawyerByEmail } from "../../services/lawyerService";

export default function Payment() {
  const [category, setCategory] = useState();
  const [lawyer, setLawyer] = useState();

  const o = cookie.get("categoryName");
  const id = useParams().id;

  useEffect(() => {
    getCategoryById(id).then((res) => setCategory(res));
    getLawyerByEmail(cookie.get("emailPayment")).then((res) => setLawyer(res));
  }, []);

  return (
    <MDBContainer className="container-fluid mt-5 h-100 paymentContainer">
      <MDBRow className="">
        <MDBCol md="4">
          <MDBRow className="flex-column">
            <MDBCol className="profilePayment">
              <LawyerPayment lawyer={lawyer} />
            </MDBCol>
            <MDBCol className="paymentCard">
              <PaymentCard category={category} o={o} />
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="8">
          <MDBRow>
            <MDBCol md="12"></MDBCol>
            <MDBCol
              md="12"
              className="d-flex row justify-content-center align-align-items-center agreement "
            >
              <AgreementCard category={category} o={o} lawyer={lawyer} />
            </MDBCol>
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
