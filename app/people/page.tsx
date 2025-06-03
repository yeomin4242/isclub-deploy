"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Github, Linkedin, MapPin, Calendar, Award, Users, Filter } from "lucide-react"

const mockMembers = [
  {
    id: 1,
    name: "김동아리",
    role: "회장",
    year: "4학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "김동",
    email: "president@club.com",
    github: "github.com/president",
    linkedin: "linkedin.com/in/president",
    location: "서울",
    joinDate: "2021-03",
    skills: ["React", "Node.js", "Python", "AWS"],
    projects: 12,
    bio: "풀스택 개발자를 꿈꾸며 다양한 프로젝트를 진행하고 있습니다. 팀워크와 소통을 중시합니다.",
    achievements: ["해커톤 1위", "프로그래밍 대회 입상", "오픈소스 기여"],
  },
  {
    id: 2,
    name: "이부회장",
    role: "부회장",
    year: "3학년",
    major: "소프트웨어학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "이부",
    email: "vicepresident@club.com",
    github: "github.com/vicepresident",
    linkedin: "linkedin.com/in/vicepresident",
    location: "경기",
    joinDate: "2022-03",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js"],
    projects: 8,
    bio: "프론트엔드 개발에 관심이 많으며, UI/UX에 대한 깊은 이해를 바탕으로 사용자 친화적인 웹을 만들고 있습니다.",
    achievements: ["웹 디자인 공모전 수상", "인턴십 수료"],
  },
  {
    id: 3,
    name: "박개발자",
    role: "개발팀장",
    year: "3학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "박개",
    email: "devlead@club.com",
    github: "github.com/devlead",
    linkedin: "linkedin.com/in/devlead",
    location: "서울",
    joinDate: "2022-09",
    skills: ["Java", "Spring", "MySQL", "Docker"],
    projects: 6,
    bio: "백엔드 개발과 시스템 아키텍처에 관심이 많습니다. 효율적이고 확장 가능한 시스템 구축을 목표로 합니다.",
    achievements: ["기업 프로젝트 참여", "알고리즘 대회 입상"],
  },
  {
    id: 4,
    name: "최신입생",
    role: "일반회원",
    year: "1학년",
    major: "컴퓨터공학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "최신",
    email: "newbie@club.com",
    github: "github.com/newbie",
    linkedin: "",
    location: "인천",
    joinDate: "2024-03",
    skills: ["Python", "C++", "HTML", "CSS"],
    projects: 2,
    bio: "프로그래밍을 배우기 시작한 신입생입니다. 열정적으로 학습하며 성장하고 있습니다.",
    achievements: ["신입생 프로젝트 완주"],
  },
  {
    id: 5,
    name: "정디자이너",
    role: "디자인팀장",
    year: "2학년",
    major: "시각디자인학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "정디",
    email: "designer@club.com",
    github: "",
    linkedin: "linkedin.com/in/designer",
    location: "서울",
    joinDate: "2023-03",
    skills: ["Figma", "Photoshop", "Illustrator", "UI/UX"],
    projects: 5,
    bio: "사용자 경험을 중시하는 디자이너입니다. 개발자와의 협업을 통해 더 나은 제품을 만들어가고 있습니다.",
    achievements: ["디자인 공모전 수상", "UI/UX 자격증 취득"],
  },
  {
    id: 6,
    name: "한알고리즘",
    role: "일반회원",
    year: "2학년",
    major: "수학과",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "한알",
    email: "algorithm@club.com",
    github: "github.com/algorithm",
    linkedin: "",
    location: "서울",
    joinDate: "2023-09",
    skills: ["Python", "C++", "Algorithm", "Data Structure"],
    projects: 4,
    bio: "알고리즘과 자료구조에 특화된 개발자입니다. 문제 해결 능력을 기르며 효율적인 코드 작성을 추구합니다.",
    achievements: ["프로그래밍 대회 다수 입상", "알고리즘 스터디 리더"],
  },
]

const roles = ["전체", "회장", "부회장", "개발팀장", "디자인팀장", "일반회원"]
const years = ["전체", "1학년", "2학년", "3학년", "4학년"]

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("전체")
  const [selectedYear, setSelectedYear] = useState("전체")

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = selectedRole === "전체" || member.role === selectedRole
    const matchesYear = selectedYear === "전체" || member.year === selectedYear
    return matchesSearch && matchesRole && matchesYear
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "회장":
        return "bg-cert-red/20 text-cert-red border-cert-red/30"
      case "부회장":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "개발팀장":
        return "bg-cert-accent/20 text-cert-accent border-cert-accent/30"
      case "디자인팀장":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-cert-gray/20 text-cert-gray border-cert-gray/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cert-black via-cert-darker to-cert-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-cert-light mb-2">People</h1>
          </div>
          <p className="text-cert-gray">우리 동아리의 멋진 멤버들을 소개합니다.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cert-gray w-4 h-4" />
            <Input
              placeholder="이름, 전공, 기술스택으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cert-card border-cert-border text-cert-light placeholder:text-cert-gray focus:border-cert-red"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cert-gray" />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40 bg-cert-card border-cert-border text-cert-light">
                <SelectValue placeholder="역할" />
              </SelectTrigger>
              <SelectContent className="bg-cert-darker border-cert-border">
                {roles.map((role) => (
                  <SelectItem key={role} value={role} className="text-cert-light hover:bg-cert-red/20">
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-40 bg-cert-card border-cert-border text-cert-light">
              <SelectValue placeholder="학년" />
            </SelectTrigger>
            <SelectContent className="bg-cert-darker border-cert-border">
              {years.map((year) => (
                <SelectItem key={year} value={year} className="text-cert-light hover:bg-cert-red/20">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="hover:shadow-xl hover:shadow-cert-red/10 transition-all duration-500 bg-cert-card border-cert-border hover:border-cert-red/30 transform hover:-translate-y-1 group"
            >
              <CardHeader className="text-center">
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 mx-auto border-2 border-cert-border group-hover:border-cert-red/30 transition-colors">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-cert-darker text-cert-light text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-cert-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl text-cert-light group-hover:text-cert-red transition-colors">
                    {member.name}
                  </CardTitle>
                  <div className="flex justify-center gap-2">
                    <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    <Badge variant="outline" className="border-cert-border/50 text-cert-gray">
                      {member.year}
                    </Badge>
                  </div>
                  <CardDescription className="text-cert-gray">{member.major}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-sm text-cert-gray text-center">{member.bio}</p>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-cert-light mb-2">기술 스택</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs border-cert-border/50 text-cert-gray hover:text-cert-light hover:border-cert-red/30 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-cert-darker p-3 rounded-lg">
                    <div className="text-lg font-bold text-cert-red group-hover:scale-110 transition-transform duration-300">
                      {member.projects}
                    </div>
                    <div className="text-xs text-cert-gray">프로젝트</div>
                  </div>
                  <div className="bg-cert-darker p-3 rounded-lg">
                    <div className="text-lg font-bold text-cert-accent group-hover:scale-110 transition-transform duration-300">
                      {member.achievements.length}
                    </div>
                    <div className="text-xs text-cert-gray">성과</div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-medium text-cert-light mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4 text-cert-red" />
                    주요 성과
                  </h4>
                  <ul className="text-xs text-cert-gray space-y-1">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-cert-red rounded-full"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-cert-border/30">
                  <div className="flex items-center justify-between text-xs text-cert-gray mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {member.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {member.joinDate} 가입
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      이메일
                    </Button>
                    {member.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        GitHub
                      </Button>
                    )}
                    {member.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-cert-border text-cert-gray hover:border-cert-red hover:text-cert-red"
                      >
                        <Linkedin className="w-3 h-3 mr-1" />
                        LinkedIn
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16 bg-cert-card/50 rounded-xl border border-cert-border">
            <Search className="w-16 h-16 text-cert-gray/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-cert-light mb-2">검색 결과가 없습니다</h3>
            <p className="text-cert-gray">다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}

        {/* Club Statistics */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-cert-light mb-8 text-center">동아리 현황</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "총 멤버", value: mockMembers.length, color: "cert-red" },
              {
                title: "총 프로젝트",
                value: mockMembers.reduce((acc, member) => acc + member.projects, 0),
                color: "cert-accent",
              },
              {
                title: "졸업예정자",
                value: mockMembers.filter((member) => member.year === "4학년").length,
                color: "cert-red",
              },
              {
                title: "신입생",
                value: mockMembers.filter((member) => member.year === "1학년").length,
                color: "cert-accent",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center bg-cert-card border-cert-border hover:border-cert-red/30 transition-all duration-300 hover:shadow-lg hover:shadow-cert-red/10 group"
              >
                <CardHeader>
                  <CardTitle
                    className={`text-2xl font-bold text-${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="text-cert-gray">{stat.title}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
