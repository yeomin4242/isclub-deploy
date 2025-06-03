"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Tag, Search, Plus, Filter, Shield, Lock, Eye, Terminal, Zap } from "lucide-react"

const mockStudies = [
  {
    id: 1,
    title: "OWASP Top 10 2023 취약점 분석",
    date: "2024-01-15",
    author: "김보안",
    description: "최신 OWASP Top 10 취약점에 대한 상세 분석과 실제 공격 시나리오, 대응 방안을 정리한 자료입니다.",
    tags: ["OWASP", "Web Security", "Vulnerability"],
    attachments: [
      { name: "OWASP_Top10_2023_Analysis.pdf", type: "pdf", size: "3.2MB" },
      { name: "Exploit_Examples.zip", type: "zip", size: "1.8MB" },
    ],
    category: "Web Security",
    difficulty: "intermediate",
  },
  {
    id: 2,
    title: "Metasploit Framework 완전 정복",
    date: "2024-01-12",
    author: "이해커",
    description: "Metasploit을 활용한 모의해킹 기법과 실습 가이드. 초보자부터 고급자까지 단계별로 학습할 수 있습니다.",
    tags: ["Metasploit", "Penetration Testing", "Exploitation"],
    attachments: [
      { name: "Metasploit_Guide.pdf", type: "pdf", size: "5.1MB" },
      { name: "Lab_Environment.ova", type: "ova", size: "2.3GB" },
    ],
    category: "Penetration Testing",
    difficulty: "advanced",
  },
  {
    id: 3,
    title: "암호학 기초와 RSA 구현",
    date: "2024-01-10",
    author: "박암호",
    description: "현대 암호학의 기초 이론부터 RSA 알고리즘의 수학적 원리와 Python 구현까지 다룹니다.",
    tags: ["Cryptography", "RSA", "Python"],
    attachments: [
      { name: "Cryptography_Basics.pdf", type: "pdf", size: "2.7MB" },
      { name: "RSA_Implementation.py", type: "py", size: "15KB" },
    ],
    category: "Cryptography",
    difficulty: "beginner",
  },
  {
    id: 4,
    title: "디지털 포렌식 실무 가이드",
    date: "2024-01-08",
    author: "최포렌식",
    description: "Autopsy와 Volatility를 활용한 디지털 증거 수집과 분석 방법론을 실습 중심으로 설명합니다.",
    tags: ["Digital Forensics", "Autopsy", "Volatility"],
    attachments: [
      { name: "Forensics_Guide.pdf", type: "pdf", size: "4.5MB" },
      { name: "Sample_Evidence.dd", type: "dd", size: "512MB" },
    ],
    category: "Digital Forensics",
    difficulty: "intermediate",
  },
  {
    id: 5,
    title: "네트워크 보안 모니터링",
    date: "2024-01-05",
    author: "정네트워크",
    description: "Wireshark와 Snort를 활용한 네트워크 트래픽 분석과 침입 탐지 시스템 구축 방법을 다룹니다.",
    tags: ["Network Security", "Wireshark", "IDS"],
    attachments: [
      { name: "Network_Monitoring.pdf", type: "pdf", size: "3.8MB" },
      { name: "Snort_Rules.conf", type: "conf", size: "45KB" },
    ],
    category: "Network Security",
    difficulty: "intermediate",
  },
]

const categories = [
  "전체",
  "Web Security",
  "Penetration Testing",
  "Cryptography",
  "Digital Forensics",
  "Network Security",
  "Malware Analysis",
]
const difficulties = ["전체", "beginner", "intermediate", "advanced"]
const allTags = [
  "OWASP",
  "Web Security",
  "Vulnerability",
  "Metasploit",
  "Penetration Testing",
  "Exploitation",
  "Cryptography",
  "RSA",
  "Python",
  "Digital Forensics",
  "Autopsy",
  "Volatility",
  "Network Security",
  "Wireshark",
  "IDS",
  "Malware Analysis",
]

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체")
  const [selectedTag, setSelectedTag] = useState("all")

  const filteredStudies = mockStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || study.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "전체" || study.difficulty === selectedDifficulty
    const matchesTag = selectedTag === "all" || selectedTag === "" || study.tags.includes(selectedTag)
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTag
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-cert-red" />
      case "zip":
        return <FileText className="w-4 h-4 text-cert-accent" />
      case "py":
        return <Terminal className="w-4 h-4 text-green-400" />
      default:
        return <FileText className="w-4 h-4 text-cert-gray" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-cert-red/20 text-cert-red border-cert-red/30"
      default:
        return "bg-cert-gray/20 text-cert-gray border-cert-gray/30"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Shield className="w-3 h-3" />
      case "intermediate":
        return <Lock className="w-3 h-3" />
      case "advanced":
        return <Zap className="w-3 h-3" />
      default:
        return <Eye className="w-3 h-3" />
    }
  }

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-cert-red/20 text-cert-red border-cert-red/30",
      "bg-cert-accent/20 text-cert-accent border-cert-accent/30",
      "bg-green-500/20 text-green-400 border-green-500/30",
      "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "bg-pink-500/20 text-pink-400 border-pink-500/30",
    ]
    return colors[tag.length % colors.length]
  }

  return (
    <div className="min-h-screen bg-cert-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-cert-light">Security Study Materials</h1>
          </div>
          <p className="text-cert-gray">사이버보안 학습 자료와 실습 가이드를 공유하고 함께 성장하세요.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cert-gray w-4 h-4" />
              <Input
                placeholder="보안 자료 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-cert-darker border-cert-gray/30 text-cert-light placeholder:text-cert-gray focus:border-cert-red"
              />
            </div>
            <Button className="bg-cert-red hover:bg-cert-red/80 text-cert-light">
              <Plus className="w-4 h-4 mr-2" />
              자료 업로드
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cert-gray" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-cert-darker border-cert-gray/30 text-cert-light">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent className="bg-cert-darker border-cert-gray/30">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-cert-light hover:bg-cert-red/20">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cert-gray" />
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40 bg-cert-darker border-cert-gray/30 text-cert-light">
                  <SelectValue placeholder="난이도" />
                </SelectTrigger>
                <SelectContent className="bg-cert-darker border-cert-gray/30">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty} className="text-cert-light hover:bg-cert-red/20">
                      {difficulty === "전체"
                        ? "전체"
                        : difficulty === "beginner"
                          ? "초급"
                          : difficulty === "intermediate"
                            ? "중급"
                            : "고급"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-cert-gray" />
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-48 bg-cert-darker border-cert-gray/30 text-cert-light">
                  <SelectValue placeholder="태그 선택" />
                </SelectTrigger>
                <SelectContent className="bg-cert-darker border-cert-gray/30">
                  <SelectItem value="all" className="text-cert-light hover:bg-cert-red/20">
                    모든 태그
                  </SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag} className="text-cert-light hover:bg-cert-red/20">
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedCategory !== "전체" || selectedDifficulty !== "전체" || selectedTag !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("전체")
                  setSelectedDifficulty("전체")
                  setSelectedTag("all")
                }}
                className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
              >
                필터 초기화
              </Button>
            )}
          </div>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <Card
              key={study.id}
              className="bg-cert-darker border-cert-gray/20 hover:border-cert-red/50 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-cert-red/10"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-cert-red border-cert-red/30">
                    {study.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(study.difficulty)}>
                      {getDifficultyIcon(study.difficulty)}
                      <span className="ml-1">
                        {study.difficulty === "beginner"
                          ? "초급"
                          : study.difficulty === "intermediate"
                            ? "중급"
                            : "고급"}
                      </span>
                    </Badge>
                    <div className="flex items-center text-sm text-cert-gray">
                      <Calendar className="w-4 h-4 mr-1" />
                      {study.date}
                    </div>
                  </div>
                </div>
                <CardTitle className="group-hover:text-cert-red transition-colors text-cert-light">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-cert-gray">{study.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Attachments */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-cert-light">첨부파일</h4>
                  {study.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-cert-dark/50 rounded-md hover:bg-cert-dark transition-colors border border-cert-gray/20"
                    >
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <div>
                          <div className="text-sm font-medium text-cert-light">{file.name}</div>
                          <div className="text-xs text-cert-gray">{file.size}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-cert-red hover:text-cert-red/80 hover:bg-cert-red/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="pt-4 border-t border-cert-gray/20">
                  <span className="text-sm text-cert-gray">작성자: </span>
                  <span className="text-sm text-cert-accent">{study.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-16 h-16 text-cert-gray/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-cert-light mb-2">검색 결과가 없습니다</h3>
            <p className="text-cert-gray">다른 검색어나 필터를 시도해보세요.</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center bg-cert-darker border-cert-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cert-red">{mockStudies.length}</CardTitle>
              <CardDescription className="text-cert-gray">총 자료 수</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-cert-darker border-cert-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cert-accent">{categories.length - 1}</CardTitle>
              <CardDescription className="text-cert-gray">보안 분야</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-cert-darker border-cert-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cert-red">{allTags.length}</CardTitle>
              <CardDescription className="text-cert-gray">기술 태그</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-cert-darker border-cert-gray/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cert-accent">
                {mockStudies.reduce((acc, study) => acc + study.attachments.length, 0)}
              </CardTitle>
              <CardDescription className="text-cert-gray">첨부파일</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-cert-darker/50 border border-cert-red/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-cert-red mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cert-light mb-2">보안 자료 이용 안내</h3>
              <ul className="text-sm text-cert-gray space-y-1">
                <li>• 모든 자료는 교육 목적으로만 사용해주세요</li>
                <li>• 실제 시스템에 대한 무단 공격은 절대 금지입니다</li>
                <li>• 취약점 정보는 책임감 있게 다뤄주세요</li>
                <li>• 저작권이 있는 자료는 출처를 명시해주세요</li>
                <li>• 문제가 있는 자료 발견 시 즉시 신고해주세요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
