"use client";

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
  ArrowDown,
  Shield,
  Lock,
  Eye,
  Terminal,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Zap,
  Globe,
  Server,
  Bug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Korean Calendar Component
function KoreanCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days = [];
  const current = new Date(startDate);

  while (current <= lastDay || days.length % 7 !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // 동적 이벤트 생성 - 현재 달 기준
  const events = {
    [new Date(year, month, 5).toDateString()]: "보안 세미나",
    [new Date(year, month, 12).toDateString()]: "CTF 대회",
    [new Date(year, month, 18).toDateString()]: "정기 모임",
    [new Date(year, month, 25).toDateString()]: "해킹 실습",
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevMonth}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-semibold text-white">
          {year}년 {monthNames[month]}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextMonth}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === month;
          const hasEvent = events[day.toDateString()];

          return (
            <div
              key={index}
              className={`
                relative p-2 text-center text-sm rounded cursor-pointer transition-all duration-200
                ${isCurrentMonth ? "text-white" : "text-gray-500"}
                ${
                  isToday
                    ? "bg-red-600 text-white font-bold"
                    : "hover:bg-gray-800"
                }
                ${hasEvent ? "bg-blue-600/20 border border-blue-500/30" : ""}
              `}
              title={hasEvent}
            >
              {day.getDate()}
              {hasEvent && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const aboutRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const texts = [
    "Cyber Emergency Response Team",
    "Information Security Specialists",
    "Ethical Hacking Experts",
    "Digital Forensics Analysts",
  ];

  // 동적 이벤트 생성
  const generateUpcomingEvents = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return [
      {
        date: 5,
        title: "보안 세미나",
        description: "최신 사이버보안 트렌드",
        color: "red",
      },
      {
        date: 12,
        title: "CTF 대회",
        description: "교내 해킹 경진대회",
        color: "blue",
      },
      {
        date: 18,
        title: "정기 모임",
        description: "월례 정기 미팅",
        color: "red",
      },
      {
        date: 25,
        title: "해킹 실습",
        description: "웹 취약점 실습",
        color: "red",
      },
    ].filter(
      (event) =>
        event.date >= today.getDate() || currentMonth !== today.getMonth()
    );
  };

  const upcomingEvents = generateUpcomingEvents();

  useEffect(() => {
    const currentText = texts[currentIndex];
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex < currentText.length) {
        setTypedText(currentText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          const deleteTimer = setInterval(() => {
            if (charIndex > 0) {
              setTypedText(currentText.slice(0, charIndex - 1));
              charIndex--;
            } else {
              clearInterval(deleteTimer);
              setCurrentIndex((prev) => (prev + 1) % texts.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // Auto scroll logic can be implemented here
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToSchedule = () => {
    router.push("/schedule");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cert-black via-cert-darker to-cert-black"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cert-red rounded-full animate-pulse-glow"></div>
            <div
              className="absolute top-3/4 right-1/4 w-1 h-1 bg-cert-accent rounded-full animate-pulse-glow"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cert-red rounded-full animate-pulse-glow"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        <div className="text-center text-cert-light z-10 max-w-5xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <Image
                src="/images/cert-is-logo.png"
                alt="CERT-IS Logo"
                width={140}
                height={140}
                className="mx-auto mb-6 hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-cert-red/30 rounded-full blur-3xl opacity-50 animate-glow"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
            <span className="text-cert-red drop-shadow-lg">CERT</span>
            <span className="text-cert-light">-</span>
            <span className="text-cert-accent drop-shadow-lg">IS</span>
          </h1>

          <div className="text-xl md:text-2xl mb-8 text-cert-gray font-mono min-h-[3rem] flex items-center justify-center">
            <span className="border-r-2 border-cert-red animate-pulse mr-1">
              {typedText}
            </span>
            <span className="w-0.5 h-6 bg-cert-red animate-pulse"></span>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-cert-gray max-w-3xl mx-auto animate-fade-in leading-relaxed">
            사이버보안의 최전선에서 디지털 세상을 지키는 <br />
            <span className="text-cert-red font-semibold">
              차세대 보안 전문가
            </span>
            를 양성합니다
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-gradient-to-r from-cert-red to-red-700 hover:from-red-700 hover:to-cert-red text-cert-light border border-cert-red/50 shadow-2xl hover:shadow-cert-red/30 transition-all duration-500 transform hover:scale-105"
            >
              <Shield className="mr-2 w-5 h-5" />더 알아보기
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cert-accent text-cert-accent hover:bg-cert-accent hover:text-cert-black transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-cert-accent/25"
            >
              <Terminal className="mr-2 w-5 h-5" />
              Join Our Team
            </Button>
          </div>
        </div>

        {/* Floating Security Icons */}
        <div className="absolute top-20 left-10 animate-bounce opacity-30">
          <Lock className="w-8 h-8 text-cert-red" />
        </div>
        <div
          className="absolute bottom-20 right-10 animate-bounce opacity-30"
          style={{ animationDelay: "1s" }}
        >
          <Shield className="w-10 h-10 text-cert-accent" />
        </div>
        <div
          className="absolute top-1/3 right-20 animate-bounce opacity-30"
          style={{ animationDelay: "2s" }}
        >
          <Eye className="w-6 h-6 text-cert-red" />
        </div>
        <div
          className="absolute bottom-1/3 left-20 animate-bounce opacity-30"
          style={{ animationDelay: "3s" }}
        >
          <Bug className="w-7 h-7 text-cert-accent" />
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="py-24 bg-gradient-to-b from-cert-black to-cert-darker"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-cert-red/20 text-cert-red border-cert-red/30 px-4 py-2 text-sm">
              About CERT-IS
            </Badge>
            <h2 className="text-5xl font-bold text-cert-light mb-6 bg-gradient-to-r from-cert-light to-cert-gray bg-clip-text text-transparent">
              사이버보안의 최전선
            </h2>
            <p className="text-xl text-cert-gray max-w-4xl mx-auto leading-relaxed">
              CERT-IS는 급변하는 사이버 위협 환경에서 우리나라의 정보보안을
              책임질 전문가를 양성하는 대학교 동아리입니다. 실무 중심의 교육과
              최신 보안 기술 연구를 통해 미래의 사이버보안 리더를 키워나갑니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-cert-card border-cert-border hover:border-cert-red/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cert-red/20 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Shield className="w-16 h-16 text-cert-red mx-auto group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-cert-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardTitle className="text-cert-light text-lg">
                  Penetration Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cert-gray text-center leading-relaxed">
                  실제 시스템 취약점 분석과 모의해킹을 통한 보안 강화 기법을
                  학습합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-cert-card border-cert-border hover:border-cert-accent/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cert-accent/20 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Lock className="w-16 h-16 text-cert-accent mx-auto group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-cert-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardTitle className="text-cert-light text-lg">
                  Cryptography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cert-gray text-center leading-relaxed">
                  암호학 이론과 실습을 통한 데이터 보호 기술 및 암호화 시스템을
                  구축합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-cert-card border-cert-border hover:border-cert-red/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cert-red/20 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Eye className="w-16 h-16 text-cert-red mx-auto group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-cert-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardTitle className="text-cert-light text-lg">
                  Digital Forensics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cert-gray text-center leading-relaxed">
                  디지털 증거 수집과 분석을 통한 사이버 범죄 수사 기법을
                  연구합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-cert-card border-cert-border hover:border-cert-accent/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-cert-accent/20 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <Terminal className="w-16 h-16 text-cert-accent mx-auto group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-cert-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardTitle className="text-cert-light text-lg">
                  Incident Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-cert-gray text-center leading-relaxed">
                  보안 사고 대응과 복구를 위한 체계적인 프로세스와 절차를
                  학습합니다
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compact Calendar Section */}
      <section className="py-18 bg-gradient-to-b from-cert-darker to-cert-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-blue-500/20 text-cert-accent border-blue-500/30 px-4 py-2 text-sm">
              Schedule
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              이번 달 주요 일정
            </h2>
            <p className="text-gray-400 text-lg">
              동아리 활동과 교육 스케줄을 확인하세요
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            <div className="max-w-sm mx-auto lg:mx-0">
              <KoreanCalendar />
            </div>

            <div className="flex-1 max-w-md">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Calendar className="mr-2 w-5 h-5 text-red-600" />
                  다가오는 일정
                </h3>

                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-3 bg-gray-800 rounded-lg border-l-4 border-${event.color}-600`}
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div
                          className={`w-8 h-8 bg-${event.color}-600 rounded-full flex items-center justify-center text-white text-sm font-bold`}
                        >
                          {event.date}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {event.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    onClick={navigateToSchedule}
                    className="w-full border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    전체 일정 보기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-cert-darker to-cert-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-cert-light mb-6">
              동아리 플랫폼
            </h2>
            <p className="text-cert-gray max-w-3xl mx-auto text-lg">
              체계적인 학습 관리와 효율적인 협업을 위한 통합 플랫폼을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "People",
                desc: "보안 전문가들과의 네트워킹",
                color: "cert-red",
              },
              {
                icon: Calendar,
                title: "Schedule",
                desc: "체계적인 교육 일정 관리",
                color: "cert-accent",
              },
              {
                icon: BookOpen,
                title: "Study",
                desc: "최신 보안 기술 연구 자료",
                color: "cert-red",
              },
              {
                icon: MessageSquare,
                title: "Blog",
                desc: "보안 지식 공유와 소통",
                color: "cert-accent",
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center group">
                <div className="bg-cert-card border border-cert-border rounded-xl p-8 hover:border-cert-red/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cert-red/20 transform hover:-translate-y-2">
                  <div className="relative mb-6">
                    <item.icon
                      className={`w-12 h-12 text-${item.color} mx-auto group-hover:scale-110 transition-transform duration-500`}
                    />
                    <div
                      className={`absolute inset-0 bg-${item.color}/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
                  </div>
                  <h3 className="text-xl font-semibold text-cert-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-cert-gray leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-cert-black to-cert-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-cert-accent/20 text-cert-accent border-cert-accent/30 px-4 py-2">
                Our Mission
              </Badge>
              <h3 className="text-4xl font-bold text-cert-light mb-8 leading-tight">
                사이버보안 전문가 양성을 통한
                <br />
                <span className="text-cert-red">디지털 세상 보호</span>
              </h3>
              <p className="text-lg text-cert-gray mb-8 leading-relaxed">
                급변하는 사이버 위협 환경에서 우리나라의 정보보안을 책임질
                전문가를 양성하고, 실무 중심의 교육을 통해 즉시 현장에 투입
                가능한 인재를 기르는 것이 우리의 목표입니다.
              </p>
              <ul className="space-y-4 text-cert-gray">
                {[
                  { icon: Zap, text: "실시간 위협 분석 및 대응 훈련" },
                  { icon: Globe, text: "국제 보안 컨퍼런스 참가 및 발표" },
                  { icon: Server, text: "기업 연계 실무 프로젝트 수행" },
                  { icon: Shield, text: "보안 자격증 취득 지원 프로그램" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="relative mr-4">
                      <item.icon className="w-6 h-6 text-cert-red group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-cert-red/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <span className="group-hover:text-cert-light transition-colors duration-300">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cert-card to-cert-darker border border-cert-border rounded-2xl p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cert-red/5 to-cert-accent/5"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-6">
                    <Shield className="w-20 h-20 text-cert-red mx-auto" />
                    <div className="absolute inset-0 bg-cert-red/30 rounded-full blur-2xl animate-glow"></div>
                  </div>
                  <h4 className="text-3xl font-bold mb-4 text-cert-light">
                    Join CERT-IS
                  </h4>
                  <p className="mb-8 text-cert-gray leading-relaxed">
                    사이버보안의 미래를 함께 만들어갈 동료를 찾습니다. 열정과
                    도전정신이 있다면 언제든 환영합니다!
                  </p>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    { label: "모집 분야", value: "모든 전공 환영" },
                    { label: "활동 시간", value: "주 2회 정기 모임" },
                    { label: "지원 자격", value: "보안에 대한 열정" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm border-b border-cert-border/30 pb-2"
                    >
                      <span className="text-cert-gray">{item.label}</span>
                      <span className="text-cert-light font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-cert-red to-red-700 hover:from-red-700 hover:to-cert-red text-cert-light shadow-lg hover:shadow-cert-red/30 transition-all duration-500 transform hover:scale-105">
                  지원하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-cert-darker via-cert-black to-cert-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Active Members", color: "cert-red" },
              {
                number: "100+",
                label: "Security Projects",
                color: "cert-accent",
              },
              { number: "25+", label: "CTF Competitions", color: "cert-red" },
              {
                number: "5+",
                label: "Years of Excellence",
                color: "cert-accent",
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-cert-gray group-hover:text-cert-light transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
