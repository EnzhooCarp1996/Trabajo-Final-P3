import { StatusSelect } from "../Challenge/ChallengeToCompany/StatusSelect";
import type { IChallengeRef, ProposalStatus } from "../../types/types";
import { cellBodyStyle } from "../../utils/utilsChallenges";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { Tag } from "antd";


interface BaseConfig {
    showSelectEstado?: boolean;
    showEmprendedor?: boolean;
    onEstadoChange?: (id: string, estado: ProposalStatus) => void;
    openEmprendedor?: (emp: any) => void;
    openChallengeModal?: (challenge: IChallengeRef) => void;
}

export function ProposalTableColumns<T extends { createdAt: string }>(
    config: BaseConfig
) {
    return useMemo(() => {
        const {
            showSelectEstado = false,
            showEmprendedor = false,
            onEstadoChange,
            openEmprendedor,
            openChallengeModal,
        } = config;

        const columns: ColumnsType<T> = [
            {
                title: "Título",
                dataIndex: "tituloPropuesta",
                key: "tituloPropuesta",
                width: 160,
                onCell: () => ({ style: cellBodyStyle }),
            },
            {
                title: "Descripción",
                dataIndex: "descripcion",
                key: "descripcion",
                width: 250,
                onCell: () => ({ style: cellBodyStyle }),
            },
            {
                title: "Estado",
                dataIndex: "estado",
                key: "estado",
                width: 120,
                onCell: () => ({ style: cellBodyStyle }),
                render: (estado: string, record: any) =>
                    showSelectEstado ? (
                        <StatusSelect
                        isChallenge={false}
                            estado={estado}
                            onChange={(value: ProposalStatus) => onEstadoChange?.(record._id, value)}
                        />
                    ) : (
                        <Tag
                            color={
                                estado === "seleccionada"
                                    ? "green"
                                    : estado === "descartada"
                                        ? "red"
                                        : "blue"
                            }
                        >
                            {estado}
                        </Tag>
                    ),
            },
            {
                title: "Fecha",
                dataIndex: "createdAt",
                key: "createdAt",
                width: 100,
                onCell: () => ({ style: cellBodyStyle }),
                render: (date: string) => new Date(date).toLocaleDateString(),
            },
            ...(showEmprendedor
                ? [{
                    title: "Emprendedor",
                    dataIndex: "emprendedorId",
                    key: "emprendedorId",
                    width: 130,
                    onCell: () => ({ style: cellBodyStyle }),
                    render: (emp: any) => (
                        <span
                            onClick={() => openEmprendedor?.(emp)}
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "#69b1ff",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            {emp?.nombreCompleto}
                        </span>
                    )
                }]
                :
                [{
                    title: "Desafío",
                    dataIndex: "desafioId",
                    key: "desafioId",
                    width: 120,
                    onCell: () => ({ style: cellBodyStyle }),
                    render: (challenge: IChallengeRef) => (
                        <span
                            onClick={() => openChallengeModal?.(challenge)}
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "#69b1ff",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            {challenge?.titulo}
                        </span>
                    )
                }]),
        ];

        return columns;
    }, [config]);
}
