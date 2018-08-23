package net.slipp.web;

import org.springframework.data.jpa.repository.JpaRepository;

import net.slipp.domain.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	//springframework will make it's implemented instance
}
