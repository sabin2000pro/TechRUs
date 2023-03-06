import React from 'react'
import Helmet from 'react-helmet'

const MetaData = ({pageTitle}) => { // Used for dynamic page title

  return (

    <>
        <Helmet>
           <title>{`${pageTitle} - TechRUs`}</title>
        </Helmet>

    </>


  )
}

export default MetaData