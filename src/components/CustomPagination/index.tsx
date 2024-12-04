import { Pagination } from "@mui/material";

function CustomPagination({pages, onChange}: {pages:number, onChange: (page: number) => void}) {

    return (
        <>
            <Pagination count={pages} onChange={(_, page) => onChange(page)} color="primary" 
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