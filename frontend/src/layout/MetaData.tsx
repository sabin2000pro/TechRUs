import React from 'react'
import Helmet from 'react-helmet'

interface IMetaDataProps {
  pageTitle: string
}

const MetaData: React.FC<IMetaDataProps> = ({pageTitle}: IMetaDataProps) => { // Used for dynamic page title

  return (

    <>
        <Helmet>
           <title>{`${pageTitle} - TechRUs`}</title>
        </Helmet>

    </>


  )
}

export default MetaData