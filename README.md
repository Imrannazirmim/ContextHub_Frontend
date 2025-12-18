<!-- {myParticipatedContests.map(({ participant, contest }, index) => (
                            <motion.tr
                                key={contest._id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-700"
                            >
                                <td className="py-6 px-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={contest.image}
                                            alt={contest.name}
                                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                                        />
                                        <div>
                                            <p className="font-bold text-lg line-clamp-2">{contest.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 md:hidden">
                                                Prize: ${contest.prize || contest.prizeMoney}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 lg:hidden">
                                                Fee: ${contest.entryFee || contest.price}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-6 px-6">
                                    <span className="badge badge-primary text-white px-4 py-2">
                                        {contest.contestType}
                                    </span>
                                </td>

                                <td className="py-6 px-6 hidden md:table-cell">
                                    <span className="text-2xl font-bold text-green-600">
                                        ${contest.prize || contest.prizeMoney}
                                    </span>
                                </td>

                                <td className="py-6 px-6 hidden lg:table-cell">
                                    <span className="font-semibold text-blue-600">
                                        ${contest.entryFee || contest.price}
                                    </span>
                                </td>

                                <td className="py-6 px-6">
                                    <span
                                        className={`font-medium ${
                                            new Date(contest.deadline) < new Date() ? "text-red-600" : "text-orange-600"
                                        }`}
                                    >
                                        {new Date(contest.deadline).toLocaleDateString()}
                                    </span>
                                </td>

                                <td className="py-6 px-6 hidden sm:table-cell">
                                    <span
                                        className={`badge ${
                                            contest.status === "confirmed"
                                                ? "badge-success"
                                                : contest.status === "completed"
                                                ? "badge-info"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {contest.status.toUpperCase()}
                                    </span>
                                </td>

                                <td className="py-6 px-6 text-sm">
                                    {new Date(participant.registeredAt).toLocaleDateString()}
                                </td>

                                <td className="py-6 px-6 text-center">
                                    <Link to={`/contest/${contest._id}`} className="btn btn-primary btn-sm">
                                        View Details
                                    </Link>
                                </td>
                            </motion.tr>
                        ))} -->