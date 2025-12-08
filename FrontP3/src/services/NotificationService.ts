import type { CreateNotificationRequest, INotification, NotificationFilters } from '../types/types'
import axiosInstance from './AxiosService'

export interface NotificationServiceContract {
  getAll: (filters: NotificationFilters) => Promise<INotification[]>
  getById: (id: string) => Promise<INotification>
  create: (data: CreateNotificationRequest) => Promise<INotification>
  markAsSeen: (id: string) => Promise<INotification>
  //   delete: (id: string) => Promise<{ message: string }>;
}

export const notificationService: NotificationServiceContract = {
  getAll: (filters) =>
    axiosInstance.get<INotification[]>(`/notifications`, { params: filters }).then((res) => res.data),

  getById: (id) => axiosInstance.get<INotification>(`/notifications/${id}`).then((res) => res.data),

  create: (data) => axiosInstance.post<INotification>(`/notifications`, data).then((res) => res.data),

  markAsSeen: (id) =>
    axiosInstance.put<INotification>(`/notifications/${id}/visto`, { visto: true }).then((res) => res.data),

  //   delete: (id) =>
  //     axiosInstance.delete<{ message: string }>(`/notifications/${id}`).then(res => res.data),
}
