export const tagSummaryPartial: any[] = [
    {
        $project: {
            _id: 0,
            tag_id: "$_id",
            name: 1,
            color: 1,
            is_added: {
                $cond: [{ $in: ["$$auth_id", "$users"] }, true, false],
            },
        },
    },
    { $sort: { is_added: 1 } },
];
