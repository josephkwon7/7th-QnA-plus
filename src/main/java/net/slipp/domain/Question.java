package net.slipp.domain;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // this is required to avoid serializaiton related
																	// error.
public class Question extends AbstractEntity {
	@ManyToOne
	@JoinColumn(foreignKey = @ForeignKey(name = "fk_question_writer"))
	@JsonProperty
	private User writer;

	@JsonProperty
	private String title;

	@Lob
	@JsonProperty
	private String content;

	@JsonProperty
	private Integer countOfAnswer = 0;
	
	// Could not add below due to an error. ?
//	@OneToMany(mappedBy = "question")
//	@OrderBy("id ASC")
//	private List<Answer> answers;

	public Question() {
	} // JPA requires this default constructor

	public Question(User writer, String title, String content) {
		this.writer = writer;
		this.title = title;
		this.content = content;
	}

	public void update(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public boolean isSameWriter(User loginUser) {
		return this.writer.equals(loginUser);
	}

	public User getWriter() {
		return writer;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

//	public List<Answer> getAnswers() {
//		return answers;
//	}

	public void addAnswer() {
		this.countOfAnswer += 1;
	}
	
	public void deleteAnswer() {
		this.countOfAnswer -= 1;
	}

	@Override
	public String toString() {
		return "Question [" + super.toString() + ", writer=" + writer + ", title=" + title + ", content=" + content + ", countOfAnswer="
				+ countOfAnswer + "]";
	}

}
