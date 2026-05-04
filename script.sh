file_name="contribution.txt"
date_file="date.txt" # Define the date file name

date_data=$(cat "$date_file")

# Iterate over each date in the array
for date in $date_data; do
    # Skip empty lines if any
    if [[ -z "$date" ]]; then
        continue
    fi

    commit_date="${date}T12:00:00"
    
    echo "Processing commit for date: ${commit_date}"

    # Append content to the contribution file
    echo "Commit on ${commit_date}" >> "$file_name"

    # Add the file to the staging area
    git add "$file_name"

    # Commit with the specific message and date
    git commit -m "Commit on ${commit_date}" --date="${commit_date}"

    # Push the changes. Consider 'git push --force' if you are rewriting history and
    # understand the implications, especially for backdated commits.
    # For standard commits, 'git push' is sufficient.
    git push

    # Check if the push was successful before removing the date
    if [ $? -eq 0 ]; then
        echo "Successfully committed and pushed for ${commit_date}. Removing date from ${date_file}."
        # Remove the processed date from date.txt
        # Use sed to delete the line containing the exact date string
        # -i option edits the file in place.
        # Ensure 'date' variable is properly quoted for sed pattern matching.
        sed -i '' "/^${date}$/d" "$date_file"
    else
        echo "Push failed for ${commit_date}. Date will remain in ${date_file}."
        # Exit or break the loop if push fails to prevent further processing
        # and allow manual intervention.
        exit 1 
    fi
done

echo "Script finished."