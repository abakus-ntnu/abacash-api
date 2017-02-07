module.exports = [
    {
        model: 'User',
        data: {
            email: 'test@abakus.no',
            name: 'Test Bruker',
            // Password: test
            hash: '$2a$10$Gm09SZEHzdqx4eBV06nNheenfKpw3R1rXrMzmYfjX/.9UFPHnaAn6',
            systems: [
                {
                    id: 1,
                    _through: {
                        role: 'USER'
                    }
                }
            ]
        }
    },
    {
        model: 'User',
        data: {
            email: 'backup@abakus.no',
            name: 'Backup bruker',
            // Password: test
            hash: '$2a$10$Gm09SZEHzdqx4eBV06nNheenfKpw3R1rXrMzmYfjX/.9UFPHnaAn6',
            systems: [
                {
                    id: 1,
                    _through: {
                        role: 'MODERATOR'
                    }
                },
                { id: 2,
                    _through: {
                        role: 'MODERATOR'
                    }
                }
            ]
        }
    }
];
