import { Table } from "antd";

export default function ResultTable({
    list,
    columns,
    data,
    onPageChange,
}) {
    return (
        <>
        <div className="mt-4">
            <Table
                dataSource={list}
                columns={columns}
                rowKey="id"
                scroll={{ x: "max-content" }}
                pagination={{
                    current: data.current_page,
                    pageSize: data.per_page,
                    total: data.total,
                    onChange: {onPageChange},
                }}
            />
            </div>
        </>
    );
}
