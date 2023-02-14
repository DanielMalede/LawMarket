import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import {
  LawyerProfileCard,
  ReviewsInput,
  CommentSection,
  LawyerCategories,
} from "../../AppRoute/featuresRoute/lawyerProfile";
import { useParams } from "react-router-dom";
import GoogleMapLocation from "../../GoogleMap/GoogleMap";
import { getLawyerByEmail } from "../../services/lawyerService";
import cookie from "js-cookie";

export default function LawyerProfile() {
  let { email } = useParams();
  const [lawyer, setLawyers] = useState();
  const [category, setCategory] = useState([]);
  const [userLoged, setUserLoged] = useState();

  const getCategory = async () => {
    getLawyerByEmail(email)
      .then((res) => {
        setLawyers(res);
        setCategory(res?.category[0].subCategory);
      })
      .catch((error) => console.log(error));
    setUserLoged(cookie.get("user"));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol size={12} className=" col-md-12 col-lg-6 mt-5 pt-4">
            <LawyerProfileCard lawyer={lawyer} />
          </MDBCol>
          <MDBCol>
            <MDBCol>
              <MDBRow className=" row-cols-md-2 mt-5">
                {category?.map((item,i) => {
                  return (
                    <MDBCol key={i} size={12} className="p-0 mb-3 pt-4">
                      <LawyerCategories item={item} />
                    </MDBCol>
                  );
                })}
              </MDBRow>
            </MDBCol>
            <MDBCol className="mt-4">
              <GoogleMapLocation lawyer={lawyer?.location} />
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-5">
              {lawyer?.reviews?.map((item, i) => {
                return <CommentSection key={i} index={i} item={item} />;
              })}
              <div className={cookie.get("rate") ? "d-none" : ""}>
                {userLoged ? (
                  <ReviewsInput userLoged={userLoged} lawyer={lawyer} />
                ) : (
                  ""
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
}
