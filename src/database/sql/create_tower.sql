CREATE TABLE `tower_user_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id` varchar(24) NOT NULL COMMENT '用户id',
  `score` int(10) NOT NULL DEFAULT '0' COMMENT '分数',
  `floor` int(5) NOT NULL DEFAULT '0' COMMENT '层数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_score` (`score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='盖楼游戏用户记录';