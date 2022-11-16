import { map } from "lodash";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Col, Container, Row } from "reactstrap";
import RELandingCard from "./RElandingCard";
import Pagination from "components/Pagination/Pagination";
import {
  getAllProperty,
  getPropertyCount,
} from "RealEstateCbe/helpers/REbackend_helper";
import { Link } from "react-router-dom";
import { useUser } from "RealEstateCbe/contextProviders/userProvider";

const RELandingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [property, setproperty] = useState([]);
  const [propertyCount, setpropertyCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useUser();

  const loadProperty = async () => {
    const res = await getAllProperty({ page, limit, searchText });
    if (res.success) {
      setproperty(res.property);
    } else {
      console.log("Error while fetching property", res);
    }
  };

  const loadPropertyCount = async () => {
    const res = await getPropertyCount({ searchText });
    if (res.success) {
      setpropertyCount(res.count);
    } else {
      console.log("Error while fetching propertyCount", res);
    }
  };

  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      await loadProperty();
      setLoading(false);
    };
    handleLoad();
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  useEffect(() => {
    console.log("searchText :", searchText);
    const handleLoad = async () => {
      setLoading(true);
      await loadPropertyCount();
      await loadProperty();
      setLoading(false);
    };

    handleLoad();
  }, [searchText]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Home| Coimbatore RealEstate</title>
        </MetaTags>
        <Container fluid>
          <>
            {/* <h4>Landing page of Coimbatore RealEstate</h4> */}

            <div className="mb-2">
              <form className="app-search  ">
                <div className="position-relative">
                  <input
                    type="text-success"
                    className="form-control "
                    placeholder="Search for Properties..."
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </div>
            {loading ? (
              <Row>
                <Col xs="12">
                  <div className="text-center my-3">
                    <Link to="#" className="text-success">
                      <i className="bx bx-hourglass bx-spin me-2" />
                      Loading. . .
                    </Link>
                  </div>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  {map(property, (user, key) => (
                    <RELandingCard user={user} key={"_user_" + key} />
                  ))}
                </Row>
                <div className="d-flex justify-content-center">
                  <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={propertyCount}
                    pageSize={limit}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              </>
            )}
          </>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RELandingPage;
