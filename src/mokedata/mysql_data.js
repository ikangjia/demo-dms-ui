const treeData = [
    {
        id: '1-d#db_sql',
        label: 'db_sql',
        icon: 'el-icon-menu',
        children: [
            {
                id: '2-t#db_sql',
                label: '表',
                icon: 'el-icon-folder',
                children: [
                    {
                        id: '3-t#db_sql#t_user',
                        label: 't_user'
                    },
                    {
                        id: '3-t#db_sql#t_student',
                        label: 't_student'
                    },
                    {
                        id: '3-t#db_sql#t_class',
                        label: 't_class'
                    },
                ]
            },
            {
                id: '2-v#db_sql',
                label: '视图',
                icon: 'el-icon-folder',
                children: [
                    {
                        id: '3-t#db_sql#t_user',
                        label: 't_user'
                    },
                    {
                        id: '3-t#db_sql#t_student',
                        label: 't_student'
                    },
                    {
                        id: '3-t#db_sql#t_class',
                        label: 't_class'
                    },
                ]
            },
            {
                id: '2-p#db_sql',
                label: '存储过程',
                icon: 'el-icon-folder',
                children: [
                    {
                        id: '3-p#db_sql#p23',
                        label: 'p23'
                    },
                    {
                        id: '3-p#db_sql#p12',
                        label: 'p12'
                    },
                    {
                        id: '3-p#db_sql#p90',
                        label: 'p90'
                    },
                ]
            },
            {
                id: '2-f#db_sql',
                label: '函数',
                icon: 'el-icon-folder',
                children: [
                    {
                        id: '3-f#db_sql#f1',
                        label: 'f1'
                    }
                ]
            },
        ]
    },
    {
        id: '1-d#db_sql1',
        label: 'db_sql1',
        icon: 'el-icon-menu',
        children: [
            {
                id: '2-t#db_sql1',
                label: '表',
                icon: 'el-icon-folder',
                children: [
                    {
                        id: '3-t#db_sql1#t_user',
                        label: 't_user'
                    }
                ]
            },
            {
                id: '2-v#db_sql1',
                label: '视图',
                icon: 'el-icon-folder',
            },
            {
                id: '2-p#db_sql1',
                label: '存储过程',
                icon: 'el-icon-folder',
            },
            {
                id: '2-f#db_sql1',
                label: '函数',
                icon: 'el-icon-folder',
            },
        ]
    },
]
export default treeData
