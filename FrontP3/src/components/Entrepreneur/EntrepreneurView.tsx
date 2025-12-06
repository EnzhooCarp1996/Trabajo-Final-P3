import { useEntrepreneurView } from "../../hooks/EntrePreneur/useEntrepreneurView";
import { EntrepreneursList } from "./EntrepreneursList";
import { Box } from "@mui/material";

export const EntrepreneurView = () => {
    const { entrepreneurs, loading } = useEntrepreneurView();

    return (
        <>
            {/* Lista */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                    gap={3}
                    width="100%"
                >
                    {entrepreneurs.map((entrepreneur) => (
                        <EntrepreneursList
                            key={entrepreneur._id}
                            entrepreneur={entrepreneur}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};
