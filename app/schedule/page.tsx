"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Terminal,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LabReservation {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  requester: string;
  participants: number;
  description: string;
  type: "practical" | "meeting" | "workshop" | "study" | "conference";
  status: "approved" | "pending" | "rejected";
}

// 현재 날짜 기준으로 동적 이벤트 생성
const generateMockReservations = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return [
    {
      id: 1,
      title: "보안 세미나",
      date: new Date(currentYear, currentMonth, 5).toISOString().split("T")[0],
      startTime: "14:00",
      endTime: "16:00",
      room: "보안랩 A",
      requester: "김보안",
      status: "approved" as const,
      participants: 25,
      description: "최신 사이버보안 트렌드와 위협 동향 분석",
      type: "workshop" as const,
    },
    {
      id: 2,
      title: "CTF 대회",
      date: new Date(currentYear, currentMonth, 12).toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "18:00",
      room: "컨퍼런스룸",
      requester: "CTF팀",
      status: "approved" as const,
      participants: 50,
      description: "교내 해킹 경진대회 - 웹, 포렌식, 리버싱 문제",
      type: "conference" as const,
    },
    {
      id: 3,
      title: "정기 모임",
      date: new Date(currentYear, currentMonth, 18).toISOString().split("T")[0],
      startTime: "19:00",
      endTime: "21:00",
      room: "보안랩 B",
      requester: "동아리회장",
      status: "approved" as const,
      participants: 30,
      description: "월례 정기 미팅 및 활동 계획 수립",
      type: "meeting" as const,
    },
    {
      id: 4,
      title: "해킹 실습",
      date: new Date(currentYear, currentMonth, 25).toISOString().split("T")[0],
      startTime: "15:00",
      endTime: "18:00",
      room: "보안랩 A",
      requester: "실습팀",
      status: "approved" as const,
      participants: 15,
      description: "웹 취약점 실습 및 모의해킹 시나리오",
      type: "practical" as const,
    },
    {
      id: 5,
      title: "암호학 스터디",
      date: new Date(currentYear, currentMonth, today.getDate() + 3)
        .toISOString()
        .split("T")[0],
      startTime: "18:00",
      endTime: "20:00",
      room: "보안랩 C",
      requester: "박암호",
      status: "pending" as const,
      participants: 8,
      description: "블록체인 암호화 기술 스터디",
      type: "study" as const,
    },
    {
      id: 6,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      room: "보안랩 A",
      requester: "관리자",
      status: "approved" as const,
      participants: 20,
      description: "디지털 포렌식 도구 실습 - Autopsy, Volatility",
      type: "workshop" as const,
    },
  ];
};

const mockReservations: LabReservation[] = generateMockReservations();

const rooms = ["보안랩 A", "보안랩 B", "보안랩 C", "컨퍼런스룸"];
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
const activityTypes = [
  "practical",
  "meeting",
  "workshop",
  "study",
  "conference",
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservations, setReservations] =
    useState<LabReservation[]>(mockReservations);

  const [newReservation, setNewReservation] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    participants: "",
    description: "",
    type: "practical" as const,
  });

  const formatKoreanDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const hasReservation = reservations.some(
        (res) => res.date === dateString
      );
      const approvedReservations = reservations.filter(
        (res) => res.date === dateString && res.status === "approved"
      );
      const pendingReservations = reservations.filter(
        (res) => res.date === dateString && res.status === "pending"
      );

      days.push({
        day,
        date,
        hasReservation,
        approvedCount: approvedReservations.length,
        pendingCount: pendingReservations.length,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: selectedDate?.toDateString() === date.toDateString(),
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleReservationSubmit = () => {
    if (
      newReservation.title &&
      newReservation.date &&
      newReservation.startTime &&
      newReservation.endTime &&
      newReservation.room
    ) {
      const reservation: LabReservation = {
        id: reservations.length + 1,
        title: newReservation.title,
        date: newReservation.date,
        startTime: newReservation.startTime,
        endTime: newReservation.endTime,
        room: newReservation.room,
        requester: "현재 사용자",
        participants: Number.parseInt(newReservation.participants) || 1,
        description: newReservation.description,
        type: newReservation.type,
        status: "pending",
      };
      setReservations([...reservations, reservation]);
      setNewReservation({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        participants: "",
        description: "",
        type: "practical",
      });
      setIsDialogOpen(false);
    }
  };

  const getSelectedDateReservations = () => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split("T")[0];
    return reservations.filter((res) => res.date === dateString);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            승인됨
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기중
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-cert-red/20 text-cert-red border-cert-red/30">
            <XCircle className="w-3 h-3 mr-1" />
            거절됨
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "practical":
        return <Terminal className="w-4 h-4 text-cert-red" />;
      case "meeting":
        return <Users className="w-4 h-4 text-cert-accent" />;
      case "workshop":
        return <Shield className="w-4 h-4 text-green-400" />;
      case "study":
        return <Lock className="w-4 h-4 text-purple-400" />;
      default:
        return <Calendar className="w-4 h-4 text-cert-gray" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "practical":
        return "bg-cert-red/20 text-cert-red border-cert-red/30";
      case "meeting":
        return "bg-cert-accent/20 text-cert-accent border-cert-accent/30";
      case "workshop":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "study":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-cert-gray/20 text-cert-gray border-cert-gray/30";
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="min-h-screen bg-cert-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-cert-red" />
              <h1 className="text-3xl font-bold text-cert-light">
                Lab Schedule & Reservation
              </h1>
            </div>
            <p className="text-cert-gray">
              보안 실습실 예약과 일정을 관리하세요.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cert-red hover:bg-cert-red/80 text-cert-light">
                <Plus className="w-4 h-4 mr-2" />
                실습실 예약
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-cert-darker border-cert-gray/30">
              <DialogHeader>
                <DialogTitle className="text-cert-light">
                  보안 실습실 예약
                </DialogTitle>
                <DialogDescription className="text-cert-gray">
                  실습실 사용을 신청하세요. 관리자 승인 후 예약이 확정됩니다.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-cert-light">
                    제목
                  </Label>
                  <Input
                    id="title"
                    value={newReservation.title}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        title: e.target.value,
                      })
                    }
                    placeholder="활동 제목을 입력하세요"
                    className="bg-cert-dark border-cert-gray/30 text-cert-light"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date" className="text-cert-light">
                      날짜
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newReservation.date}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          date: e.target.value,
                        })
                      }
                      className="bg-cert-dark border-cert-gray/30 text-cert-light"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-cert-light">
                      활동 유형
                    </Label>
                    <Select
                      value={newReservation.type}
                      onValueChange={(value: any) =>
                        setNewReservation({ ...newReservation, type: value })
                      }
                    >
                      <SelectTrigger className="bg-cert-dark border-cert-gray/30 text-cert-light">
                        <SelectValue placeholder="활동 유형을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent className="bg-cert-darker border-cert-gray/30">
                        <SelectItem
                          value="practical"
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          실습
                        </SelectItem>
                        <SelectItem
                          value="meeting"
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          회의
                        </SelectItem>
                        <SelectItem
                          value="workshop"
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          워크샵
                        </SelectItem>
                        <SelectItem
                          value="study"
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          스터디
                        </SelectItem>
                        <SelectItem
                          value="conference"
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          컨퍼런스
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime" className="text-cert-light">
                      시작 시간
                    </Label>
                    <Select
                      value={newReservation.startTime}
                      onValueChange={(value) =>
                        setNewReservation({
                          ...newReservation,
                          startTime: value,
                        })
                      }
                    >
                      <SelectTrigger className="bg-cert-dark border-cert-gray/30 text-cert-light">
                        <SelectValue placeholder="시작" />
                      </SelectTrigger>
                      <SelectContent className="bg-cert-darker border-cert-gray/30">
                        {timeSlots.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="text-cert-light hover:bg-cert-red/20"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime" className="text-cert-light">
                      종료 시간
                    </Label>
                    <Select
                      value={newReservation.endTime}
                      onValueChange={(value) =>
                        setNewReservation({ ...newReservation, endTime: value })
                      }
                    >
                      <SelectTrigger className="bg-cert-dark border-cert-gray/30 text-cert-light">
                        <SelectValue placeholder="종료" />
                      </SelectTrigger>
                      <SelectContent className="bg-cert-darker border-cert-gray/30">
                        {timeSlots.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="text-cert-light hover:bg-cert-red/20"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="participants" className="text-cert-light">
                      참석자 수
                    </Label>
                    <Input
                      id="participants"
                      type="number"
                      value={newReservation.participants}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          participants: e.target.value,
                        })
                      }
                      placeholder="인원"
                      className="bg-cert-dark border-cert-gray/30 text-cert-light"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room" className="text-cert-light">
                    실습실
                  </Label>
                  <Select
                    value={newReservation.room}
                    onValueChange={(value) =>
                      setNewReservation({ ...newReservation, room: value })
                    }
                  >
                    <SelectTrigger className="bg-cert-dark border-cert-gray/30 text-cert-light">
                      <SelectValue placeholder="실습실을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="bg-cert-darker border-cert-gray/30">
                      {rooms.map((room) => (
                        <SelectItem
                          key={room}
                          value={room}
                          className="text-cert-light hover:bg-cert-red/20"
                        >
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-cert-light">
                    설명
                  </Label>
                  <Textarea
                    id="description"
                    value={newReservation.description}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        description: e.target.value,
                      })
                    }
                    placeholder="활동 목적이나 추가 정보를 입력하세요"
                    className="bg-cert-dark border-cert-gray/30 text-cert-light"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
                >
                  취소
                </Button>
                <Button
                  className="bg-cert-red hover:bg-cert-red/80 text-cert-light"
                  onClick={handleReservationSubmit}
                >
                  신청하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-cert-darker border-cert-gray/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cert-light flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-cert-red" />
                    {monthYear}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-semibold text-cert-gray p-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => day && handleDateClick(day.date)}
                      className={`
                        aspect-square flex flex-col items-center justify-center text-sm relative cursor-pointer rounded p-1
                        ${day ? "hover:bg-cert-gray/20" : ""}
                        ${
                          day?.isToday
                            ? "bg-cert-red/30 text-cert-red border border-cert-red"
                            : ""
                        }
                        ${
                          day?.isSelected
                            ? "ring-2 ring-cert-accent text-cert-accent"
                            : ""
                        }
                        ${
                          !day?.isToday && !day?.isSelected
                            ? "text-cert-light"
                            : ""
                        }
                        ${!day ? "opacity-0" : ""}
                      `}
                    >
                      {day && (
                        <>
                          <span className="font-medium">{day.day}</span>
                          {day.hasReservation && (
                            <div className="flex gap-1 mt-1">
                              {day.approvedCount > 0 && (
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              )}
                              {day.pendingCount > 0 && (
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center space-x-6 text-xs text-cert-gray">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>승인된 예약</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                    <span>대기중인 예약</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Details */}
          <div className="space-y-6">
            {selectedDate ? (
              <>
                <Card className="bg-cert-darker border-cert-gray/20">
                  <CardHeader>
                    <CardTitle className="text-cert-light text-lg">
                      {formatKoreanDate(selectedDate)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getSelectedDateReservations().length > 0 ? (
                        getSelectedDateReservations().map((reservation) => (
                          <div
                            key={reservation.id}
                            className="bg-cert-dark rounded-lg p-4 border border-cert-gray/20"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={getTypeColor(reservation.type)}>
                                {getTypeIcon(reservation.type)}
                                <span className="ml-1">
                                  {reservation.type === "practical" && "실습"}
                                  {reservation.type === "meeting" && "회의"}
                                  {reservation.type === "workshop" && "워크샵"}
                                  {reservation.type === "study" && "스터디"}
                                  {reservation.type === "conference" &&
                                    "컨퍼런스"}
                                </span>
                              </Badge>
                              {getStatusBadge(reservation.status)}
                            </div>
                            <h4 className="text-cert-light font-medium mb-2">
                              {reservation.title}
                            </h4>
                            <p className="text-cert-gray text-sm mb-3">
                              {reservation.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center text-cert-gray">
                                <Clock className="w-3 h-3 mr-1 text-cert-accent" />
                                {reservation.startTime} - {reservation.endTime}
                              </div>
                              <div className="flex items-center text-cert-gray">
                                <MapPin className="w-3 h-3 mr-1 text-cert-red" />
                                {reservation.room}
                              </div>
                              <div className="flex items-center text-cert-gray">
                                <Users className="w-3 h-3 mr-1 text-cert-accent" />
                                {reservation.participants}명
                              </div>
                              <div className="text-cert-gray">
                                신청자: {reservation.requester}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-cert-gray text-center py-4">
                          이 날에는 예정된 예약이 없습니다.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-cert-darker border-cert-gray/20">
                <CardContent className="pt-6">
                  <p className="text-cert-gray text-center">
                    날짜를 선택하여 상세 일정을 확인하세요.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Room Status */}
            <Card className="bg-cert-darker border-cert-gray/20">
              <CardHeader>
                <CardTitle className="text-cert-light text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cert-red" />
                  실습실 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rooms.map((room) => {
                    const isOccupied = Math.random() > 0.6; // Random for demo
                    return (
                      <div
                        key={room}
                        className="flex items-center justify-between p-3 bg-cert-dark rounded border border-cert-gray/20"
                      >
                        <span className="text-cert-light text-sm flex items-center gap-2">
                          <Lock className="w-4 h-4 text-cert-red" />
                          {room}
                        </span>
                        <Badge
                          className={
                            isOccupied
                              ? "bg-cert-red/20 text-cert-red border-cert-red/30"
                              : "bg-green-500/20 text-green-400 border-green-500/30"
                          }
                        >
                          {isOccupied ? "사용중" : "사용가능"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Guidelines */}
        <div className="mt-12 bg-cert-darker/50 border border-cert-red/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-cert-red mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cert-light mb-2">
                보안 실습실 이용 수칙
              </h3>
              <ul className="text-sm text-cert-gray space-y-1">
                <li>• 모든 실습은 격리된 환경에서만 진행해주세요</li>
                <li>• 실제 시스템에 대한 무단 침입은 절대 금지입니다</li>
                <li>• 실습 후 모든 도구와 데이터를 정리해주세요</li>
                <li>• 민감한 정보는 실습실 외부로 반출하지 마세요</li>
                <li>• 문제 발생 시 즉시 관리자에게 보고해주세요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
