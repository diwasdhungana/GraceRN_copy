import {
  createDeleteManyMutationHook,
  createDeleteMutationHook,
  createGetQueryHook,
  createPostMutationHook,
  createPutMutationHook,
} from '@/api/helpers';
import { queryClient } from '@/api/query-client';
import { notifications } from '@mantine/notifications';
import { InvalidateQueryFilters } from '@tanstack/react-query';

export const useGetQuestions = createGetQueryHook({
  endpoint: '/questions',
  rQueryParams: { queryKey: ['getQuestions'] },
});
export const useGetSpecificQuestion = createGetQueryHook({
  endpoint: '/questions/:questionId',
  rQueryParams: {
    queryKey: ['getSpecificQuestion'],
  },
});

export const useDeleteManyQuestions = createDeleteManyMutationHook({
  endpoint: '/questions',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getQuestions'] as InvalidateQueryFilters);
      notifications.show({ message: 'Question deleted successfully', color: 'green' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const usePostQuestion = createPostMutationHook({
  endpoint: '/questions',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getQuestions'] as InvalidateQueryFilters);
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
