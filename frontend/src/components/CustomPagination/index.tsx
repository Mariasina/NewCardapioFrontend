import { Pagination } from "@mui/material";

function CustomPagination({pages}: {pages:number}) {

    return (
        <>
            <Pagination count={pages} color="primary" 
                sx={{
                    position: "fixed",
                    bottom: 10,
                    ".MuiPaginationItem-root": {
                        fontFamily: '"Marcellus" !important',
                    },
                    ".MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: '#CCA67F !important',
                        ":hover": { backgroundColor: '#b3906d !important' }
                    },
                }} />
        </>
    )
}

export default CustomPagination;