"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageCircle, Eye, ThumbsUp, Shield, AlertTriangle, Info, Zap } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "2024년 상반기 CTF 대회 참가 안내",
    content: "국제 CTF 대회에 팀 단위로 참가합니다. 웹 해킹, 포렌식, 암호학 등 다양한 분야의 문제가 출제됩니다...",
    author: "관리자",
    date: "2024-01-15",
    category: "공지사항",
    views: 256,
    likes: 18,
    comments: 12,
    isNotice: true,
    priority: "high",
  },
  {
    id: 2,
    title: "신규 취약점 CVE-2024-0001 분석 보고서",
    content: "최근 발견된 Apache 웹서버 취약점에 대한 상세 분석과 대응 방안을 공유합니다...",
    author: "김보안",
    date: "2024-01-14",
    category: "보안분석",
    views: 189,
    likes: 25,
    comments: 8,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "모의해킹 실습 환경 구축 가이드",
    content: "Kali Linux와 Metasploit을 활용한 모의해킹 실습 환경 구축 방법을 단계별로 설명합니다...",
    author: "이해커",
    date: "2024-01-13",
    category: "기술자료",
    views: 334,
    likes: 42,
    comments: 15,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 4,
    title: "보안 동아리 랩실 이용 규칙 업데이트",
    content: "랩실 보안 강화를 위한 새로운 이용 규칙이 적용됩니다. 모든 회원은 필독 바랍니다...",
    author: "관리자",
    date: "2024-01-12",
    category: "공지사항",
    views: 178,
    likes: 8,
    comments: 5,
    isNotice: true,
    priority: "high",
  },
  {
    id: 5,
    title: "CISSP 자격증 스터디 그룹 모집",
    content: "CISSP 자격증 취득을 목표로 하는 스터디 그룹을 모집합니다. 함께 공부하실 분들을 찾습니다...",
    author: "박자격증",
    date: "2024-01-11",
    category: "스터디",
    views: 145,
    likes: 19,
    comments: 7,
    isNotice: false,
    priority: "low",
  },
]

const categories = ["전체", "공지사항", "보안분석", "기술자료", "스터디", "자유게시판"]

export default function BoardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지사항":
        return "bg-cert-red/20 text-cert-red border-cert-red/30"
      case "보안분석":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "기술자료":
        return "bg-cert-accent/20 text-cert-accent border-cert-accent/30"
      case "스터디":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-cert-gray/20 text-cert-gray border-cert-gray/30"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-cert-red" />
      case "medium":
        return <Info className="w-4 h-4 text-yellow-400" />
      default:
        return <Zap className="w-4 h-4 text-cert-accent" />
    }
  }

  return (
    <div className="min-h-screen bg-cert-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cert-red" />
            <h1 className="text-3xl font-bold text-cert-light">Security Board</h1>
          </div>
          <p className="text-cert-gray">보안 정보와 기술 자료를 공유하는 전문 게시판입니다.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cert-gray w-4 h-4" />
            <Input
              placeholder="보안 정보 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cert-darker border-cert-gray/30 text-cert-light placeholder:text-cert-gray focus:border-cert-red"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-cert-red text-cert-light hover:bg-cert-red/80"
                    : "border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <Button className="bg-cert-red hover:bg-cert-red/80 text-cert-light">
            <Plus className="w-4 h-4 mr-2" />새 글 작성
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className={`bg-cert-darker border-cert-gray/20 hover:border-cert-red/50 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-cert-red/10 ${
                post.isNotice ? "border-cert-red/50 shadow-cert-red/5" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.isNotice && (
                        <Badge className="bg-cert-red/20 text-cert-red border-cert-red/30">
                          <Shield className="w-3 h-3 mr-1" />
                          공지
                        </Badge>
                      )}
                      <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      {getPriorityIcon(post.priority)}
                    </div>
                    <CardTitle className="text-lg text-cert-light group-hover:text-cert-red transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-cert-gray">{post.content}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-cert-gray">
                  <div className="flex items-center gap-4">
                    <span className="text-cert-accent">{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hover:text-cert-accent transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cert-red transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cert-accent transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              이전
            </Button>
            <Button size="sm" className="bg-cert-red text-cert-light">
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-cert-gray/30 text-cert-gray hover:border-cert-red hover:text-cert-red"
            >
              다음
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-cert-darker/50 border border-cert-red/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-cert-red mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cert-light mb-2">보안 게시판 이용 안내</h3>
              <ul className="text-sm text-cert-gray space-y-1">
                <li>• 민감한 보안 정보는 암호화하여 공유해주세요</li>
                <li>• 실제 취약점 정보는 책임감 있게 다뤄주세요</li>
                <li>• 불법적인 해킹 도구나 방법은 공유하지 마세요</li>
                <li>• 모든 게시물은 교육 목적으로만 사용해주세요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
