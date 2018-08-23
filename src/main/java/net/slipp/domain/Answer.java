package net.slipp.domain;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Answer extends AbstractEntity {

	@ManyToOne
	@JsonProperty
	@JoinColumn(foreignKey = @ForeignKey(name = "fk_answer_to_writer"))
	private User writer;

	@ManyToOne
	@JsonProperty
	@JoinColumn(foreignKey = @ForeignKey(name = "fk_answer_to_question"))
	private Question question;

	@Lob
	@JsonProperty
	private String content;

	// spring-boot requires this default constructor
	public Answer() {
	}

	public Answer(User writer, Question question, String content) {
		this.writer = writer;
		this.question = question;
		this.content = content;
	}

	public boolean isSameWriter(User loginUser) {
		return loginUser.equals(writer);
	}

	@Override
	public String toString() {
		return "Answer [" + super.toString() + ", writer=" + writer + ", question=" + question + ", content=" + content + "]";
	}

}
