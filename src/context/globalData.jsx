import React, { useState ,createContext, useEffect } from 'react'
export const GlobalDataContext = createContext(null)

export default function GlobalDataContextProvider(props) {
    const [currentPage, setCurrentPage] = useState();

    const setCurrentPageData = (pagename) => {
      setCurrentPage(pagename)
    }
    

    const globalDataContextExports = {
        currentPage,
        setCurrentPage,
        setCurrentPageData
    }
  return (
    <GlobalDataContext.Provider value={globalDataContextExports}>
      {props.children}
    </GlobalDataContext.Provider>
  )
}
