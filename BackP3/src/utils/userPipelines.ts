export function buildUserPipeline(role: string) {
  const pipeline: any[] = [
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      }
    },
    { $unwind: "$role" },
    { $match: { "role.nombre": role } }
  ];

  const lookupsByRole: Record<string, any[]> = {
    empresa: [
      {
        $lookup: {
          from: "challenges",
          localField: "_id",
          foreignField: "empresaId",
          as: "challenges"
        }
      },
      {
        $addFields: {
          challengeCount: { $size: "$challenges" }
        }
      },
      { $project: { challenges: 0 } }
    ],
    emprendedor: [
      {
        $lookup: {
          from: "proposals",
          localField: "_id",
          foreignField: "emprendedorId",
          as: "proposals"
        }
      },
      {
        $addFields: {
          proposalCount: { $size: "$proposals" }
        }
      },
      { $project: { proposals: 0 } }
    ]
  };

  return [...pipeline, ...(lookupsByRole[role] || [])];
}
