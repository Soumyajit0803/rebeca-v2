import React from "react";
import { Skeleton, Card, Grid } from "antd";

const { useBreakpoint } = Grid;

const LoadingPage = () => {
    const screens = useBreakpoint();

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                padding: screens.xs ? "16px" : "24px",
                boxSizing: "border-box",
            }}
        >
            {/* Filters/Controls - Responsive layout */}
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "24px",
                    flexWrap: screens.xs ? "wrap" : "nowrap",
                }}
            >
                <Skeleton.Button
                    active
                    style={{
                        width: screens.xs ? "100%" : "120px",
                        flex: screens.xs ? "1 1 100%" : "0 0 auto",
                    }}
                />
                <Skeleton.Button
                    active
                    style={{
                        width: screens.xs ? "100%" : "150px",
                        flex: screens.xs ? "1 1 100%" : "0 0 auto",
                    }}
                />
                {!screens.xs && <Skeleton.Button active style={{ width: "100px" }} />}
                <Skeleton.Input
                    active
                    style={{
                        width: screens.xs ? "100%" : "200px",
                        flex: screens.xs ? "1 1 100%" : "0 0 auto",
                    }}
                />
            </div>

            {/* Stats Cards - Responsive grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: screens.xs ? "1fr" : screens.md ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                    gap: screens.xs ? "12px" : "16px",
                    marginBottom: "24px",
                }}
            >
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} style={{ width: "100%" }}>
                        <Skeleton active paragraph={{ rows: 1 }} title={false} />
                        <Skeleton.Input
                            active
                            style={{
                                width: "80%",
                                marginTop: "8px",
                                height: screens.xs ? "20px" : "24px",
                            }}
                        />
                    </Card>
                ))}
            </div>

            {/* Table/List - Responsive rows */}
            <Skeleton
                active
                paragraph={{
                    rows: screens.xs ? 3 : screens.md ? 6 : 8,
                }}
                title={{
                    width: screens.xs ? "80%" : "100%",
                }}
            />
        </div>
    );
};

export default LoadingPage;
