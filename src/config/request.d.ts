export type HttpModel = {
  /** 编辑习题保存 */
  '/admin/login': {
    url: '/admin/login',
    method: 'POST',
    desc: '编辑习题保存',
    header?: {
      /** 用户token */
      authorization: string;
    },
    query?: {
    },
    param?: {
    },
    data?: {
      /** 习题id */
      exerciseId: number;
      /** 题干 */
      title: string;
      /** 册别编号 */
      materialId: number;
      /** 教材编号 */
      textbookId: number;
      /** 内容同上 */
      children: {
      }[];
      /** 知识点id数组 */
      keypoints: {
        id: number;
      }[];
      /** 问题数组（选支） */
      question: {
        /** 原问题id，如果id为0则表示新增问题。非选择题为0. */
        id: number;
        /** 问题内容。非选择题为空串 */
        content: string;
        /** 排序值。非选择题为0 */
        sequence: number;
        /** 答案数组 */
        answerInfo: {
          /** 原答案id，如果id为0则表示新增答案 */
          id: number;
          /** 对应问题id，如果为0则表示非选择题 */
          questionId: number;
          /** 是否正确，选择题1，非选择题0 */
          correct: number;
          /** 答案值，选择题为空 */
          answer: string;
          /** 选择题为答案对应的选支顺序，非选择题为填空顺序 */
          sequence: number;
          /** 非选择题分值 */
          score: number;
        }[];
      }[];
      /** 解析。子题为空 */
      analysis: {
        /** 原解析id，如果为0则表示新增 */
        id: number;
        /** 解析内容 */
        analysis: string;
      };
      /** 是否为选择题 */
      isChoiceQuestion: boolean;
      /** 题型id */
      categoryId: number;
      /** 学科Id */
      subjectId: number;
      /** 子题类型 */
      childCategoryId?: number;
    },
    response: {
      result: {
        /** 返回的习题id，如果是更新则返回的id跟传入的exerciseId一样 */
        data: number;
        header: {
          responseCode: number;
          remark: string;
        };
      };
    }["result"];
  };
  /** 编辑习题保存 */
  '/admin/ad/position/list': {
    url: '/admin/ad/position/list',
    method: 'GET',
    header?: {
      /** 用户token */
      authorization: string;
    },
    query?: {
    },
    params: {
    },
    data?: {
      /** 习题id */
      exerciseId: number;
      /** 题干 */
      title: string;
      /** 册别编号 */
      materialId: number;
      /** 教材编号 */
      textbookId: number;
      /** 内容同上 */
      children: {
      }[];
      /** 知识点id数组 */
      keypoints: {
        id: number;
      }[];
      /** 问题数组（选支） */
      question: {
        /** 原问题id，如果id为0则表示新增问题。非选择题为0. */
        id: number;
        /** 问题内容。非选择题为空串 */
        content: string;
        /** 排序值。非选择题为0 */
        sequence: number;
        /** 答案数组 */
        answerInfo: {
          /** 原答案id，如果id为0则表示新增答案 */
          id: number;
          /** 对应问题id，如果为0则表示非选择题 */
          questionId: number;
          /** 是否正确，选择题1，非选择题0 */
          correct: number;
          /** 答案值，选择题为空 */
          answer: string;
          /** 选择题为答案对应的选支顺序，非选择题为填空顺序 */
          sequence: number;
          /** 非选择题分值 */
          score: number;
        }[];
      }[];
      /** 解析。子题为空 */
      analysis: {
        /** 原解析id，如果为0则表示新增 */
        id: number;
        /** 解析内容 */
        analysis: string;
      };
      /** 是否为选择题 */
      isChoiceQuestion: boolean;
      /** 题型id */
      categoryId: number;
      /** 学科Id */
      subjectId: number;
      /** 子题类型 */
      childCategoryId?: number;
    },
    response: {
      data: {
        /** 返回的习题id，如果是更新则返回的id跟传入的exerciseId一样 */
        data: number;
        header: {
          responseCode: number;
          remark: string;
        };
      };
    }["data"];
  };
}
