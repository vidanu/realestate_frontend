import { map } from "lodash"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Col, Container, Row ,Collapse} from "reactstrap"
import { Link, useLocation } from "react-router-dom"
import REProjectDetail from "./REDetailspage"
import { isEmpty } from "lodash"
import { getPropertyById as onGetPropertyDetails } from "../../../../store/projects/actions"
import { useSelector, useDispatch } from "react-redux"
import Header from "components/HorizontalLayout/Header"
import Navbar from "components/HorizontalLayout/Navbar"


function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const REProjectOverview = props => {
  const dispatch = useDispatch()
  let query = useQuery()
  const { REprojectDetail } = useSelector(state => ({
    REprojectDetail: state.projects.property.msg,
  }))
  const {
    match: { params },
  } = props

  useEffect(() => {
    dispatch(onGetPropertyDetails({ objectId: query.get("uid") }))
  }, [])
  return (
    <React.Fragment>
   
      <div className="page-content">
        <MetaTags>
          <title>Project Overview| Coimbatore RealEstate</title>
        </MetaTags>
        <Container fluid>
          {/* <Header /> */}
          {!isEmpty(REprojectDetail) && (
            <>
              {/* <h4>Landing page of Coimbatore RealEstate</h4> */}

              <>
                <Row>
                  <Col lg="12">
                    <REProjectDetail user={REprojectDetail} />
                  </Col>
                </Row>
              </>
            </>
          )}
        </Container>
       
      </div>
    </React.Fragment>
  )
}

export default REProjectOverview
REProjectOverview.propTypes = {
  match: PropTypes.object,
}
